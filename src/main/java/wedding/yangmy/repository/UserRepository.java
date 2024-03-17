package wedding.yangmy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import wedding.yangmy.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

}