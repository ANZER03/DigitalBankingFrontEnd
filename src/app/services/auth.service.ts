import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {jwtDecode} from 'jwt-decode';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated : boolean = false;
  username: any;
  roles!: any;
  accessToken!: any;


  backUrl: String = 'http://localhost:8085'

  constructor(private http: HttpClient, private router : Router, private httpClient : HttpClient) {
  }

  login(username: string, password: string) {
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }

    let params = new HttpParams().set("username" , username).set("password" , password)

    return this.http.post(this.backUrl + "/auth/login",params, options )
  }

  loadProfile(data: any) {
    this.isAuthenticated = true;
    this.accessToken = data['access-token'];

    let decodedJwt = jwtDecode(this.accessToken);

    // console.log(decodedJwt)
    // @ts-ignore
    this.roles = decodedJwt['scope']
    this.username = decodedJwt['sub']
    window.localStorage.setItem('access-token', this.accessToken);
    // console.log(this.roles)
  }

  logout() {
    this.isAuthenticated = false;
    this.username = undefined;
    this.roles= undefined;
    this.accessToken = undefined;
    window.localStorage.removeItem('access-token');
    this.router.navigate(['/login']);
  }

  loadJwtFromLocalStorage(){
    let token = window.localStorage.getItem('access-token');
    if(token){
      this.loadProfile({'access-token': token});
    }
  }
}
