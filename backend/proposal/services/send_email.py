from typing_extensions import final
from attr import dataclass

@final
@dataclass(frozen=True, slots=True)
class SendEmail(object):
    def __call__(self, destiny, subject, content):
        print("Sending email {} {} {}".format(destiny, subject, content))
