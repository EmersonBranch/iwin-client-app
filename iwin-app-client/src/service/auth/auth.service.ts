import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, catchError, from, Observable, of, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private hasCompanySubject = new BehaviorSubject<boolean>(false);
  hasCompany$ = this.hasCompanySubject.asObservable();    
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<any>(null);
  private url = `${environment.api}/users`;
  private readonly TOKEN_KEY = 'currentUser';
  private userRoles: string[] = [];
  constructor(private http: HttpClient, 
            private afAuth: AngularFireAuth
  ) {
     const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
     const hasCompany = JSON.parse(localStorage.getItem('hasCompany') || 'false');
 
     this.isAuthenticated.next(isAuthenticated);
     this.hasCompanySubject.next(hasCompany);
 
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated.next(true);
        this.currentUserSubject.next(user);
      } else {
        this.isAuthenticated.next(false);
        this.currentUserSubject.next(null);
      }
    });
    this.getAuthorization();
    this.getRole();
    
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('isClosing', 'true');
    });

    window.addEventListener('unload', () => {
      if (localStorage.getItem('isClosing') === 'true') {
        this.logout();
        localStorage.removeItem('isClosing');
      }
    });

    window.addEventListener('load', () => {
      localStorage.removeItem('isClosing');
    });
  }
  

  setUserRoles(roles: string[]) {
    this.userRoles = roles;
  }

  userHasPermission(role: string): boolean {
    return this.userRoles.includes(role);
  }
  
  get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  get currentUserId(): string | null {
    return this.currentUserSubject.value ? this.currentUserSubject.value.uid : null;
  }
  
  async getAuthorization() {
    const idToken = await this.getIdToken();
    return {Authorization: 'Bearer ' + idToken};
  }

  async getIdToken() {
    return new Promise<string | null>((resolve, reject) => {
      this.afAuth.onAuthStateChanged(async (currentUser) => {
        if (currentUser) {
          const idToken = await currentUser.getIdToken(true);
          resolve(idToken);
        } else {
          resolve(null);
        }
      })
    });
  }

  // async getCurrentUser(): Promise<any | null> {
  //   return new Promise<any | null>((resolve, reject) => {
  //     this.afAuth.onAuthStateChanged(async (currentUser) => {
  //       if (currentUser) {
  //         const user: any = await this.findById(currentUser.uid);
  //         resolve(user);
  //       } else {
  //         resolve(null);
  //       }
  //     })
  //   });
  // }

  async getRole() {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.onAuthStateChanged(async (currentUser) => {
        if (currentUser) {
          const idTokenResult = await currentUser.getIdTokenResult();
          console.log('resolve', resolve(idTokenResult.claims?.['role']));

        } else {
          resolve(null);
        }
      })
    });
  }

  login(user: any): Observable<{ userCredential: any }> {
    return from(this.afAuth.signInWithEmailAndPassword(user.email, user.password)).pipe(
      switchMap(userCredential => {
        const userId = userCredential.user?.uid;
        if (userId) {
          this.currentUserSubject.next(userCredential.user);
          return of({ userCredential }); 
        } else {
          return throwError(() => new Error('User ID not found'));
        }
      }),
      catchError(err => throwError(() => err))
    );
  }

logout(): void {
  this.afAuth.signOut()
      .then(() => {
          localStorage.removeItem('currentUser');
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('hasCompany'); 
          this.isAuthenticated.next(false);
          this.currentUserSubject.next(null);
      })
      .catch((error:any) => {
          console.log("Erro ao fazer logout:", error);
      });
}

  public createUser(data: { email: string; password: string; displayName?: string; profileData?: any }): Observable<any> {
    return this.http.post(this.url, data);
  }
}
