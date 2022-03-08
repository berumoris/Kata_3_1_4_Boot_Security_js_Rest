package ru.kata.spring.boot_security.demo.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.dao.UserRepository;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImp implements UserService, UserDetailsService {

    private final UserRepository userRepository;
    private final RoleServiceImp roleService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("User " + id + " not found"));
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public void deleteUser(Long id) {
        boolean exists = userRepository.existsById(id);
        if (!exists) {
            throw new IllegalStateException("User with " + id + " not exists");
        }
        userRepository.deleteById(id);
    }

    @Override
    public void saveUser(User user) {
        User userByEmail = userRepository.findByEmail(user.getEmail());
        if (userByEmail != null) {
            throw new IllegalStateException("Email: " + userByEmail);
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Set<Role> roleSet = new HashSet<>();
        if (user.getRoles() != null) {
            for (Role rl: user.getRoles()) {
                roleSet.add(roleService.findByNameRole(rl.getNameRole()));
            }
        }
        user.setRoles(roleSet);
        userRepository.save(user);
    }

    @Override
       public void updateUser(User user) {
        User userFromDb = userRepository.findByEmail(user.getEmail());
        if (userFromDb != null && userFromDb.getId() != user.getId()) {
            throw new IllegalStateException("Email taken");
        }
        if (user.getPassword().equals("")) {
            user.setPassword(getUserById(user.getId()).getPassword());
        } else {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        Set<Role> roleSet = new HashSet<>();
        if (user.getRoles() != null) {
            for (Role r : user.getRoles()) {
                roleSet.add(roleService.findByNameRole(r.getNameRole()));
            }
        }
        user.setRoles(roleSet);
        userRepository.save(user);
    }

    @Override
    public void setUserRole(String email, String nameRole) {
        User user = userRepository.findByEmail(email);
        Role role = roleService.findByNameRole(nameRole);
        user.getRoles().add(role);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return new org.springframework.security.core.userdetails.User(user.getEmail(),
                user.getPassword(),
                user.isEnabled(),
                user.isEnabled(),
                user.isEnabled(),
                user.isEnabled(),
                user.getAuthorities());
    }
}
