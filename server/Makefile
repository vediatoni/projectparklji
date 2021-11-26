SERVER_FILES := Server

override CXXFLAGS += -std=c++17 -Isrc -IuSockets/src
override LDFLAGS += uSockets/*.o -lz


all:
	make Game.o
	make Player.o
	make PlayerList.o
	make Packet.o
	make server

Game.o : 
	cd uSockets && WITH_SSL=0 make
	$(CXX) -c $(CXXFLAGS) server/src/Game.cpp server/src/Game.h 

Player.o:
	$(CXX) -c -std=c++17 server/src/Player.cpp server/src/Player.h 

PlayerList.o:
	$(CXX) -c -std=c++17 server/src/PlayerList.cpp server/src/PlayerList.h 

Packet.o:
	$(CXX) -c -std=c++17 server/src/Packet.cpp server/src/Packet.h 

.PHONY: server
server:
	$(CXX) -flto $(CXXFLAGS) server/Server.cpp -o Server Game.o Player.o PlayerList.o Packet.o $(LDFLAGS)
	#$(foreach FILE,$(SERVER_FILES),$(CXX) -flto -O3 $(CXXFLAGS) server/$(FILE).cpp -o $(FILE) $(LDFLAGS);)
	


