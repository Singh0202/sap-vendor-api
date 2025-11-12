import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { BasicStrategy } from './basic.strategy';
import { BasicAuthGuard } from './basic-auth.guard';

@Module({
  imports: [PassportModule],
  providers: [BasicStrategy, BasicAuthGuard],
  exports: [BasicAuthGuard],
})
export class AuthModule {}