package br.com.creditas.factories;

import br.com.creditas.services.DefaultMembershipService;
import br.com.creditas.services.MembershipService;

public class MembershipServiceFactory {
    public static MembershipService getInstance() {
        return new DefaultMembershipService();
    }
}
