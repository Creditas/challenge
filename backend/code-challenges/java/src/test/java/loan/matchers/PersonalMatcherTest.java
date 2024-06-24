package loan.matchers;

import loan.Customer;
import org.junitpioneer.jupiter.cartesian.CartesianTest;

import static org.assertj.core.api.Assertions.assertThat;

public class PersonalMatcherTest {
    private final Matcher matcher = new PersonalMatcher();

    @CartesianTest
    public void testWhenValid(
            @CartesianTest.Values(ints = {2999, 3000, 3001, 4999, 5000, 5001}) int income,
            @CartesianTest.Values(ints = {29, 30, 31}) int age,
            @CartesianTest.Values(booleans = {true, false}) boolean liveInSp) {
        assertThat(matcher.matches(new Customer(income, age, liveInSp))).isTrue();
    }

}
