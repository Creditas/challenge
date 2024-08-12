package loan.matchers;

import loan.Customer;
import org.junitpioneer.jupiter.cartesian.CartesianTest;

import static org.assertj.core.api.Assertions.assertThat;

public class CollaterizedMatcherTest {
    private CollateralizedMatcher matcher = new CollateralizedMatcher();

    @CartesianTest
    public void testWhenValidBelowOrEqual3000Income(
            @CartesianTest.Values(ints = {2999, 3000}) int income,
            @CartesianTest.Values(ints = {29}) int age,
            @CartesianTest.Values(booleans = {true}) boolean liveInSp) {
        assertThat(matcher.matches(new Customer(income, age, liveInSp))).isTrue();
    }

    @CartesianTest
    public void testWhenInvalidAgeBelowOrEqual3000Income(
            @CartesianTest.Values(ints = {2999, 3000}) int income,
            @CartesianTest.Values(ints = {30, 31}) int age,
            @CartesianTest.Values(booleans = {true}) boolean liveInSp) {
        assertThat(matcher.matches(new Customer(income, age, liveInSp))).isFalse();
    }

    @CartesianTest
    public void testWhenInvalidResidenceBelowOrEqual3000Income(
            @CartesianTest.Values(ints = {2999, 3000}) int income,
            @CartesianTest.Values(ints = {29}) int age,
            @CartesianTest.Values(booleans = {false}) boolean liveInSp) {
        assertThat(matcher.matches(new Customer(income, age, liveInSp))).isFalse();
    }

    @CartesianTest
    public void testWhenValidBetween3001And4999Income(
            @CartesianTest.Values(ints = {3001, 4999}) int income,
            @CartesianTest.Values(ints = {29, 30, 31}) int age,
            @CartesianTest.Values(booleans = {true}) boolean liveInSp) {
        assertThat(matcher.matches(new Customer(income, age, liveInSp))).isTrue();
    }

    @CartesianTest
    public void testWhenInvalidResidenceBetween3001And4999Income(
            @CartesianTest.Values(ints = {3001, 4999}) int income,
            @CartesianTest.Values(ints = {29, 30, 31}) int age,
            @CartesianTest.Values(booleans = {false}) boolean liveInSp) {
        assertThat(matcher.matches(new Customer(income, age, liveInSp))).isFalse();
    }

    @CartesianTest
    public void testWhenValidAboveOrEqual5000Income(
            @CartesianTest.Values(ints = {5000, 5001}) int income,
            @CartesianTest.Values(ints = {29}) int age,
            @CartesianTest.Values(booleans = {false, true}) boolean liveInSp) {
        assertThat(matcher.matches(new Customer(income, age, liveInSp))).isTrue();
    }

    @CartesianTest
    public void testWhenInvalidAgeAboveOrEqual5000Income(
            @CartesianTest.Values(ints = {5000, 5001}) int income,
            @CartesianTest.Values(ints = {30, 31}) int age,
            @CartesianTest.Values(booleans = {false, true}) boolean liveInSp) {
        assertThat(matcher.matches(new Customer(income, age, liveInSp))).isFalse();
    }
}
