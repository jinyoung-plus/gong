// src/app/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { AdminService } from './admin.service';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private adminService: AdminService,
        private authService: AuthService,
        private router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | boolean {
        // Check if the route is intended for admins
        if (route.data['isAdminRoute']) {
            return this.adminService.isAdminLoggedIn.pipe(
                map(isAdminLoggedIn => {
                    if (!isAdminLoggedIn) {
                        this.router.navigate(['/']); // Redirect to home if not an admin
                        return false;
                    }
                    return true;
                })
            );
        }

        // For non-admin routes, check if the user is authenticated
        return this.authService.isAuthenticated.pipe(
            map(isAuthenticated => {
                if (!isAuthenticated) {
                    this.router.navigate(['/']); // Redirect to home if not authenticated
                    return false;
                }
                return true;
            })
        );
    }
}
