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
    private boolean initialized = false;

    @PostConstruct
    public void initDefaultAccount() {
        if (!initialized && loginRepository.count() == 0) {
            Login defaultUser = new Login();
            defaultUser.setUsername("phucmy");
            defaultUser.setPassword("Aa@123");
            loginRepository.save(defaultUser);
            initialized = true;
        }
    }

    public Login save(Login login) {
        return loginRepository.save(login);
    }

    public Login findByUsername(String username) {
        return loginRepository.findByUsername(username);
    }
}
