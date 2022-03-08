package ru.kata.spring.boot_security.demo.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.dao.RoleRepository;
import ru.kata.spring.boot_security.demo.model.Role;

@Service
@RequiredArgsConstructor
@Transactional
public class RoleServiceImp implements RoleService {

    private final RoleRepository roleRepository;

    @Override
    public void createRole(Role role) {
        Role roleByName = roleRepository.findByNameRole(role.getNameRole());
        if (roleByName != null) {
            throw new IllegalStateException("Role " + roleByName);
        }
        roleRepository.save(role);
    }

    @Override
    public Role findByNameRole(String nameRole) {
        return roleRepository.findByNameRole(nameRole);
    }
}