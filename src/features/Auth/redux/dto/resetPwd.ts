import { Expose } from 'class-transformer';
import { Equals, IsString, Length, Matches } from 'class-validator';

export class ResetPwdDto {
  @IsString()
  @Length(10, 10, {
    message: 'Số điện thoại phải là 10 số'
  })
  @Matches(/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/, {
    message: 'Số điện thoại của bạn không đúng định dạng!'
  })
  @Expose()
  public phone!: string;

  @IsString({
    message: 'Mật khẩu phải là chuỗi kí tự'
  })
  @Length(8, undefined, {
    message: 'Mật khẩu ít nhất 8 kí tự'
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message: 'Tối thiểu tám ký tự, ít nhất một chữ hoa, một chữ thường và một số'
  })
  @Expose()
  public password!: string;

  @IsString({
    message: 'Mật khẩu phải là chuỗi kí tự'
  })
  @Length(8, undefined, {
    message: 'Mật khẩu ít nhất 8 kí tự'
  })
  @Equals('password')
  @Expose()
  public confirmPassword!: string;

  @IsString()
  @Length(6, 6, {
    message: 'Mã xác thực chỉ có 6 kí tự'
  })
  @Expose()
  public code!: string;
}
