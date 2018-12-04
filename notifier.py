import collections


EMAIL = 'email'
SHIPPING_LABEL = 'shipping_label'


class Notifier:
    def __init__(self):
        self.informations = collections.defaultdict(set)

    def add(self, notification, _type):
        notifier = self.informations.get(_type)
        if not notifier
            raise ValueError('Notifier type not supported')
        notifier.add(notification)

    def process(self):
        self._send_email()
        self._print_shipping_label()

    def _send_email(self):
        ''' Send a template email adding extra informations. '''
        pass

    def _print_shipping_label(self):
        ''' Print shipping label adding extra informations. '''
        pass