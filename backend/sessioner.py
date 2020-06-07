from twisted.internet.defer import Deferred, inlineCallbacks, returnValue
from twisted.logger import Logger
from autobahn.twisted.wamp import ApplicationSession
from autobahn.wamp.types import SubscribeOptions, PublishOptions, RegisterOptions

import time
import datetime

class Sessioner(ApplicationSession):

    logger = Logger()

    def onConnect(self):
        self.join("chat", ["ticket"], "sessioner")

    def onChallenge(self, challenge):
        if challenge.method == 'ticket':
            return 'checksessions'
    
    @inlineCallbacks
    def onJoin(self, details):
        self.log.info("********* SESSIONER HAS JOINED THE REALM ************ ")
        yield self.subscribe(self.onUserMessage, 'com.chipchap.session.user.actions:message', SubscribeOptions(details=True))
        yield self.register(self.getContacts, 'com.chipchap.session.user.actions:contacts', RegisterOptions(details=True))
        yield self.register(self.myID, 'com.chipchap.session.user.actions:getmyID', RegisterOptions(details=True))

    @inlineCallbacks
    def getContacts(self, details):
        contacts = []
        user = yield self.call('com.chipchap.users.actions:getUserID', details.caller)
        for contactid in list(user.values())[0]['contacts']:
            name = yield self.call('com.chipchap.users.actions:getUserInfo', contactid)
            contacts.append({'id':contactid, 'name': name, 'last_seen': '5 mins ago'})
        print("GOT A CALL FOR GETCONTACTS WITH CONTACTS: {}".format(contacts))
        returnValue(contacts)

    @inlineCallbacks
    def myID(self, details):
        user = yield self.call('com.chipchap.users.actions:getUserID', details.caller)
        userid = list(user.keys())[0]
        returnValue(userid)

    @inlineCallbacks
    def onUserMessage(self, msg, toid, details):
        message = []
        ts = time.time()
        st = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S').split(' ')
        message.append({'datetime': st[0], 'time': st[1], 'text': str(msg), 'self':False})
        self.log.info("!!!! DETAILS RECEIVED: {}".format(details))
        user = yield self.call('com.chipchap.users.actions:getUserID', details.publisher)
        userid = list(user.keys())[0]
        if toid in list(user.values())[0]['contacts']:
            senduri = 'com.chipchap.session.user.actions:listen:{}'.format(toid)
            yield self.publish(senduri, message, userid)
        
        