package wedding.yangmy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import wedding.yangmy.entity.User;
import wedding.yangmy.services.UserService;

import java.util.List;

@Controller
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public String showAllUsers(Model model) {
        List<User> users = userService.getAllUsers();
        model.addAttribute("users", users);
        return "user/list";
    }
    @GetMapping("/add")
    public String addUserForm (Model model) {
        model.addAttribute(  "user", new User());
        return "user/add";
    }
    @PostMapping("/add")
    public String addUser(@ModelAttribute("user") User user, BindingResult result,Model model){
        userService.addUser(user);
        return "redirect:/users";
    }
    @GetMapping("/delete/{id}")
    public String deleteUser(@PathVariable Long id) {
        User user = userService.getUserById(id);
        if (user == null) {
            return "redirect:/users";
        }
        userService.deleteUser(id);
        return "redirect:/users";
    }

    @GetMapping("/edit/{id}")
    public String editUserForm(@PathVariable Long id, Model model) {
        User user = userService.getUserById(id);
        if (user == null) {
            return "redirect:/users";
        }
        model.addAttribute("user", user);
        return "user/edit";
    }

    @PostMapping("/edit/{id}")
    public String editUser(@ModelAttribute("user") User user, @PathVariable Long id) {
        User edituser = userService.getUserById(id);
        if (edituser == null) {
            return "redirect:/users";
        }
        edituser.setName(user.getName());
        return "redirect:/users";
    }

}