import "bootstrap/dist/css/bootstrap.min.css";
import { UserInterface } from "./model/Userinterface";
// import  axios  from "axios";


import {
    validate,                   // Hàm kiểm tra xem một đối tượng có tuân thủ các ràng buộc được xác định hay không.
    validateOrReject,           // Hàm kiểm tra và nếu không tuân thủ các ràng buộc sẽ ném ra một ngoại lệ.
    Contains,                   // Kiểm tra xem một chuỗi có chứa một chuỗi con cụ thể hay không.
    IsInt,                      // Kiểm tra xem một giá trị có phải là một số nguyên hay không.
    Length,                     // Kiểm tra độ dài của một chuỗi hoặc mảng có nằm trong một phạm vi cụ thể hay không.
    IsEmail,                    // Kiểm tra xem một chuỗi có đúng định dạng của một địa chỉ email hay không.
    IsFQDN,                     // Kiểm tra xem một chuỗi có phải là một tên miền đầy đủ (fully qualified domain name) hay không.
    IsDate,                     // Kiểm tra xem một giá trị có phải là một ngày hợp lệ hay không.
    Min,                        // Kiểm tra xem một giá trị có lớn hơn hoặc bằng một giá trị tối thiểu cụ thể hay không.
    Max,                        // Kiểm tra xem một giá trị có nhỏ hơn hoặc bằng một giá trị tối đa cụ thể hay không.
    IsNotEmpty,                 // Kiểm tra xem một giá trị có rỗng (empty) hay không.
    MinLength,                  // Kiểm tra xem độ dài của một chuỗi có lớn hơn hoặc bằng một giá trị tối thiểu cụ thể hay không.
    Matches,
} from 'class-validator';
import { error } from "console";


// Gọi dữ liệu API
const url: string = 'http://localhost:3000/users';

fetch(url)
  .then(response => response.json())
  .then((data: any[]) => {
    // Hiển thị dữ liệu trên giao diện
    const userList: HTMLElement | null = document.getElementById('user-list');

    if (userList) {
      data.forEach(userData => {
        const row: HTMLTableRowElement = document.createElement('tr');
        row.innerHTML = `
          <td>${userData.id}</td>
          <td>${userData.name}</td>
          <td>${userData.email}</td>
          <td>${userData.password}</td>
          <td>
            <button class="btn btn-primary">Sửa</button>
            <button class="btn btn-danger">Xóa</button>
          </td>
        `;
        userList.appendChild(row);
      });
    } else {
      console.error('Error: Element with id "user-list" not found.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });


class App implements UserInterface {
    @IsNotEmpty({
      message: "không được để trống"
    }) 
    public name: string;

    @IsEmail({}, {
      message: "phải có định dạng hợp lệ"
    })  
    @IsNotEmpty({
      message: "không được để trống"
    }) 
    public email: string;
    
     @MinLength(8, {
      message: "Mật khẩu phải ít nhất 8 ký tự"
    })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, { 
        message: "Phải ít nhất 8 ký tự,phải có ít nhất 1 chữ hoa,1 chữ thường và 1 số và 1 ký tự"
    })

    public password: string;
    
  //   @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/, { 
  //     message: "Phải ít nhất 8 ký tự, phải có ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt"
  // })
 
   


    constructor() {
        const buttonSubmit: HTMLElement = document.getElementById("submit");
        buttonSubmit.addEventListener("click", () => this.handleSubmit());
        
      }

      async handleSubmit() {
        const name: HTMLInputElement = document.getElementById("name") as HTMLInputElement;
        const email: HTMLInputElement = document.getElementById("email") as HTMLInputElement;
        const password: HTMLInputElement = document.getElementById("password") as HTMLInputElement;
      
        this.name = name.value;
        this.email = email.value;
        this.password = password.value;
        
             
        const isValid = await this.Validator();
        
        // Nếu dữ liệu hợp lệ, thì mới log và thực hiện các thao tác tiếp theo
        if (isValid) {
            // Ghi dữ liệu vào console
            console.log(this.name);
            console.log(this.email);
            console.log(this.password);
        }
        this.ClearError();
        this.Validator();
        
      }
      async Validator() {
        try {
          const errors = await validate(this);
          if(errors.length === 0) {
            return true; 
          }
          errors.forEach(element => {
            const propertyName = element.property;
            const errorConstraints = Object.values(element.constraints).join(". ");
            const errorMessage = `${propertyName}: ${errorConstraints}`;
            const errorElement = document.getElementById(propertyName);
            if (errorElement) {
              errorElement.classList.add("border-danger");
              errorElement.nextElementSibling.textContent = errorMessage;
            }
          });
          return false; 
        } catch (validationErrors) {
          console.error(validationErrors);
          return false; 
        }
      }
      ClearError() {
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
          input.classList.remove('border-danger');
          const errorMessageElement = input.nextElementSibling;
          if (errorMessageElement) {
            errorMessageElement.textContent = '';
          }
        });
      }  
   
}

new App();