package wedding.yangmy.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import wedding.yangmy.entity.Login;
import wedding.yangmy.services.LoginService;

@Controller
@RequestMapping("/")
public class LoginController {

    @Autowired
    LoginService loginService;

    @GetMapping("/login")
    public String home(HttpServletRequest request) {
        // Kiểm tra xem người dùng đã đăng nhập hay chưa
        if (request.getSession().getAttribute("loggedInUser") != null) {
            // Đã đăng nhập, chuyển hướng đến trang chính
            return "redirect:/home";
        }
        return "login";
    }

    @PostMapping("/login")
    public String login(@RequestParam String username, @RequestParam String password, HttpServletRequest request) {
        Login user = loginService.findByUsername(username);
        if (user != null && user.getPassword().equals(password)) {
            request.getSession().setAttribute("loggedInUser", user);
            return "redirect:/home";
        } else {
            return "redirect:/login?error=true";
        }
    }

    @PostMapping("/logout")
    public String logout(HttpServletRequest request) {
        request.getSession().removeAttribute("loggedInUser");
        return "redirect:/login";
    }
}
