package wedding.yangmy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import wedding.yangmy.entity.Login;

public interface LoginRepository extends JpaRepository<Login, Long> {
    Login findByUsername(String username);
}
