package wedding.yangmy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import wedding.yangmy.entity.User;
import wedding.yangmy.services.UserService;

@Controller
@RequestMapping("/")
public class HomeController {

    @Autowired
    UserService userService;

    @GetMapping("/home")
    public String home() {
        return "home/index";
    }

    @GetMapping("/QR")
    public String QRpage() {
        return "QR";
    }

    @GetMapping("/{id}")
    public String showUserDetail(@PathVariable Long id, Model model) {
        User user = userService.getUserById(id);
        if (user == null) {
            return "redirect:/users";
        }
        model.addAttribute("user", user);
        return "detail";
    }
}
