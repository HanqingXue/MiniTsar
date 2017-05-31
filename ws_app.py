
#-*- encoding:utf-8 -*-  
#2014-12-18  
#author: orangleliu  
  
import tornado.web  
import tornado.websocket  
import tornado.httpserver  
import tornado.ioloop 
from os.path import join
from monitor import *
import json
class IndexPageHandler(tornado.web.RequestHandler):  
    def get(self):  
        self.render('index.html')  
  
class WebSocketHandler(tornado.websocket.WebSocketHandler):  
    def check_origin(self, origin):  
        return True  
  
    def open(self): 

        self.write_message(getDiskstate())
        pass
  
    def on_message(self, message): 
        while True:
            cpu = getCPUstate()
            mem = getMemorystate1()
            io = getIostate()
            net = getnetIostate()
            stat = {
                'cpu': cpu,
                'mem': mem,
                'io': io,
                'net': net
            }
            self.write_message(json.dumps(stat))  
  
    def on_close(self):  
        pass  
  
class Application(tornado.web.Application):  
    def __init__(self):  
        handlers = [  
            (r'/', IndexPageHandler),  
            (r'/ws', WebSocketHandler)  
        ]  
  
        settings = { "template_path": ".",
                    "static_path": "./static"
            }  
        tornado.web.Application.__init__(self, handlers, **settings)  
  
if __name__ == '__main__':  
    ws_app = Application()  
    server = tornado.httpserver.HTTPServer(ws_app)  
    server.listen(8080)  
    tornado.ioloop.IOLoop.instance().start()
