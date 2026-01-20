package loan.matchers;

import loan.Customer;
import org.junit.jupiter.api.Test;
import org.junitpioneer.jupiter.cartesian.CartesianTest;

import static org.assertj.core.api.Assertions.assertThat;

public class PayrollMatcherTest {
    private final Matcher matcher = new PayrollMatcher();

    @CartesianTest
    public void testWhenValid(
            @CartesianTest.Values(ints = {5000, 5001}) int income,
            @CartesianTest.Values(ints = {29, 30, 31}) int age,
            @CartesianTest.Values(booleans = {true, false}) boolean liveInSp) {
        assertThat(matcher.matches(new Customer(income, age, liveInSp))).isTrue();
    }

    @CartesianTest
    public void testWhenInvalid(
            @CartesianTest.Values(ints = {2999, 3000, 3001, 4999}) int income,
            @CartesianTest.Values(ints = {29, 30, 31}) int age,
            @CartesianTest.Values(booleans = {true, false}) boolean liveInSp) {
        assertThat(matcher.matches(new Customer(income, age, liveInSp))).isFalse();
    }
}
