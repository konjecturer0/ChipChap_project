from twisted.internet.defer import inlineCallbacks
from twisted.logger import Logger
from autobahn.twisted.wamp import ApplicationSession, ApplicationRunner


class Test1(ApplicationSession):

    logger = Logger()

    def onConnect(self):
        self.join("chat", ["anonymous"])

    def onJoin(self, details):
        self.logger("*** TEST 1 joined to the <CHAT> realm ****")
        

class Test2(ApplicationSession):

    logger = Logger()

    def onJoin(self, details):
        self.logger("*** TEST 2 joined to the <CHAT> realm ****")

if __name__ == '__main__':
    from autobahn.twisted.component import Component, run
    comp1 = Component(
        realm="chat",
        transports=[
            {
                "type": "websocket",
                "url": "ws://127.0.0.1:8080",
                "endpoint": {
                    "type": "tcp",
                    "host": "127.0.0.1",
                    "port": 8080
                },
                "options": {
                    "open_handshake_timeout": 100
                }
            }
        ],
        authentication={"anonymous": {}}
    )
    comp2 = Component(
        realm="chat",
        transports=[
            {
                "type": "websocket",
                "url": "ws://127.0.0.1:8080",
                "endpoint": {
                    "type": "tcp",
                    "host": "127.0.0.1",
                    "port": 8080
                },
                "options": {
                    "open_handshake_timeout": 200
                }
            }
        ],
        authentication={"anonymous": {}}
    )
    run([comp1, comp2])