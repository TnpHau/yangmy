package wedding.yangmy.services;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import wedding.yangmy.entity.Login;
import wedding.yangmy.repository.LoginRepository;

@Service
public class LoginService {

    @Autowired
    private LoginRepository loginRepository;
    @PostConstruct
    public void initDefaultAccount() {
        Login defaultUser = loginRepository.findByUsername("phucmy");
        if (defaultUser == null) {
            defaultUser = new Login();
            defaultUser.setUsername("phucmy");
            defaultUser.setPassword("Aa@123");
            loginRepository.save(defaultUser);
        }
    }

    public Login save(Login login) {
        return loginRepository.save(login);
    }

    public Login findByUsername(String username) {
        return loginRepository.findByUsername(username);
    }
}
