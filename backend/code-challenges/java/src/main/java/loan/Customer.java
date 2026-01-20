package loan;

public class Customer {
    private final int income;
    private final int age;
    private final boolean liveInSp;

    public Customer(int income, int age, boolean liveInSp) {
        this.income = income;
        this.age = age;
        this.liveInSp = liveInSp;
    }

    public int income() {
        return this.income;
    }

    public int age() {
        return age;
    }

    public boolean liveInSp() {
        return liveInSp;
    }
}
