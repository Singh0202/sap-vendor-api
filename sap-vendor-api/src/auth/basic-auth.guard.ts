import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class BasicAuthGuard extends AuthGuard('basic') implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // Call the default canActivate method to check for authentication
    return super.canActivate(context) as boolean;
  }
}