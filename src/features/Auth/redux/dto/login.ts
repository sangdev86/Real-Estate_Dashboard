import { Expose } from 'class-transformer';
import { IsString, Length, Matches } from 'class-validator';

export class LoginDto {
  @IsString()
  @Length(10, 10, {
    message: 'Số điện thoại phải là 10 số'
  })
  @Matches(/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/, {
    message: 'Số điện thoại của bạn không đúng định dạng!'
  })
  @Expose()
  public PhoneNumber!: string;

  @IsString({
    message: 'Mật khẩu phải là chuỗi kí tự'
  })
  @Length(6, 30, {
    message: 'Mật khẩu ít nhất 6 kí tự và tối đa 30 kí tự'
  })
  // @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
  //   message:
  //     'Tối thiểu tám ký tự, ít nhất một chữ hoa, một chữ thường và một số',
  // })
  @Expose()
  public Password!: string;
}
