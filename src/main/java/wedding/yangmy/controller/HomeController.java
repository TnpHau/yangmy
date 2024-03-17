package wedding.yangmy.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import wedding.yangmy.entity.User;
import wedding.yangmy.services.UserService;

import java.util.List;

@Controller
@RequestMapping("/")
public class HomeController {

    @Autowired
    UserService userService;

    @GetMapping("/error")
    public String home() {
        return "error";
    }

    @GetMapping(value = {"/home", "/"})
    public String showAllUsers(Model model, HttpServletRequest request) {
        if (request.getSession().getAttribute("loggedInUser") == null) {
            return "redirect:/error";
        }
        List<User> users = userService.getAllUsers();
        model.addAttribute("users", users);
        return "user/list";
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

    @PostMapping("/{id}")
    public String confirmAttendance(@PathVariable Long id, @RequestParam("decision") String decision, RedirectAttributes redirectAttributes) {
        User user = userService.getUserById(id);
        if (user != null) {
            // Update the user's decision
            user.setDecision(decision);
            userService.saveUser(user);
        }
        redirectAttributes.addFlashAttribute("message", "Đã xác nhận lựa chọn của bạn.");
        return "redirect:/{id}";
    }


}
