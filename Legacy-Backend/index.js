// Will only start services coded in javascript!
/* If you would like to use a service on another computer simply copy and paste the folder
   and run npm i on it then node . in the root of the folder*/
async function startServices() {
    console.log(`
                   _____                              
                  |  __ \                             
                  | |__) |_____   _____ _ __ ___  ___ 
                  |  _  // _ \ \ / / _ \ '__/ __|/ _ \
                  | | \ \  __/\ V /  __/ |  \__ \  __/
                  |_|  \_\___| \_/ \___|_|  |___/\___|
                                     
                                     `);
    require("./EpicGames/AccountService/index");
    require("./EpicGames/ArtifactDeliveryService/index");
    require("./EpicGames/CalderaService/index");
    require("./EpicGames/DataAssetDirectoryService/index");
    require("./EpicGames/EGSPlatformService/index");
    require("./EpicGames/EmeraldService/index");
    require("./EpicGames/EventsService/index");
    require("./EpicGames/FN-Content/index");
    require("./EpicGames/FN-Discovery-Search-Service/index");
    require("./EpicGames/FN-Discovery-Service/index");
    require("./EpicGames/FN-Habanero-Service/index");
    require("./EpicGames/FN-Hotconfig/index");
    require("./EpicGames/FN-Service/index");
    require("./EpicGames/FriendsService/index");
    require("./EpicGames/FulfillmentService/index");
    require("./EpicGames/GlobalService/index");
    require("./EpicGames/IPDataService/index");
    require("./EpicGames/KWS/index");
    require("./EpicGames/LauncherService/index");
    require("./EpicGames/LibraryService/index");
    require("./EpicGames/LightswitchService/index");
    require("./EpicGames/LinksService/index");
    require("./EpicGames/NellyService/index");
    require("./EpicGames/PRMDialogService/index");
    require("./EpicGames/PersonaService/index");
    require("./EpicGames/StatsProxyService/index");
    require("./EpicGames/TagManagementService/index");
    require("./EpicGames/UserSearchService/index");
    require("./EpicGames/WaspService/index");
    require("./EpicGames/Web/index");
}

startServices();
