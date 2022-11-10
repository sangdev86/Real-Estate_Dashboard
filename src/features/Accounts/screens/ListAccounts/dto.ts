import { Expose } from 'class-transformer';
import { IsString, Length, Matches } from 'class-validator';

export class dtoListAccounts {
  @IsString()
  @Length(10, 10, {
    message: 'Số điện thoại phải là 10 số'
  })
  @Matches(/^(0?)[1-9][0-9]{8}$/, {
    message: 'Số điện thoại của bạn không đúng định dạng!'
  })
  @Expose()
  public PhoneNumber!: string;
  //

  // @IsEmail()
  @Expose()
  public Email!: string;
  //

  @IsString({
    message: 'Mật khẩu phải là chuỗi kí tự'
  })
  @Length(8, undefined, {
    message: 'Mật khẩu ít nhất 8 kí tự'
  })
  // @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
  //   message: 'Tối thiểu tám ký tự, ít nhất một chữ hoa, một chữ thường và một số'
  // })
  @Expose()
  public Password!: string;
  //

  // @Equals('password')
  // @Expose()
  // public confirmPassword!: string;
  //

  @IsString({
    message: 'Họ và tên là một chuỗi kí tự'
  })
  @Length(1, 15, {
    message: 'Họ và tên phải từ 1 đến 15 kí tự'
  })
  @Expose()
  public Name!: string;
  //

  @Expose()
  public Birth!: Date;
  //

  @Length(1, 1, {
    message: 'Từ 1 đến 15 kí tự'
  })
  @Expose()
  public Sex!: string;
  //

  @IsString({
    message: 'chuỗi kí tự'
  })
  @Length(1, 15, {
    message: 'Từ 1 đến 50 kí tự'
  })
  @Expose()
  public Address!: string;
  @IsString({
    message: 'chuỗi kí tự'
  })
  @Length(1, 15, {
    message: 'Từ 1 đến 50 kí tự'
  })
  @Expose()
  public IdCard!: string;
  //

  @IsString({
    message: 'chuỗi kí tự'
  })
  @Length(1, 15, {
    message: 'Từ 1 đến 50 kí tự'
  })
  @Expose()
  public Type!: string;
  //

  @IsString({
    message: 'chuỗi kí tự'
  })
  @Length(1, 15, {
    message: 'Từ 1 đến 50 kí tự'
  })
  @Expose()
  public AvatarIMG!: string;
  //

  // @IsString({
  //   message: 'chuỗi kí tự'
  // })
  // @Length(1, 15, {
  //   message: 'Từ 1 đến 50 kí tự'
  // })
  @Expose()
  public Status!: string;
  //

  @IsString({
    message: 'chuỗi kí tự'
  })
  @Length(1, 15, {
    message: 'Từ 1 đến 50 kí tự'
  })
  @Expose()
  public GroupNameId!: string;
  //
}
