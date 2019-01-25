class Singleton(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = \
                super(Singleton, cls).__call__(*args, **kwargs)
        return cls._instances[cls]


class Subscription():
    def __init__(self, name: str):
        self.name = name


class Subscriptions(metaclass=Singleton):
    def __init__(self):
        self.subscriptions = {}

    def create(self, name: str):
        self.subscriptions[name] = Subscription(name)

    def get(self, name: str) -> Subscription:
        return self.subscriptions[name]
