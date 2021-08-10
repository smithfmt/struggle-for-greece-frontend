import React from "react";
//import PropTypes from "prop-types";
import { TweenLite } from "gsap";
import { gsap, CSSPlugin } from "gsap/all";
import base from "../base";
import Board from "./Board";
import Hud from "./Hud";
import { shuffle } from "../helpers";
 
gsap.registerPlugin(CSSPlugin);

class Play extends React.Component {

    state = {
        game: {},
        movingCard: {},
        selectedCard: {},
        canMoveTo: ["nowhere"],
        canAttack: ["nowhere"],
        shopType: "",
    }

    componentDidMount() {
        this.getGame();
        this.ref = base.syncState(`open-games/${this.props.params.lobbyname}`, {
            context: this,
            state: "game"
        });
        this.skipComTurns();
    }

    componentDidUpdate() {
        this.skipComTurns();
    };

    componentWillUnmount() {
        base.removeBinding(this.ref);
    };

    skipComTurns = () => {
        const game = {...this.state.game};
        if (!game.teams) return;
        const ComPlayers = ["player 1", "player 2", "player 3"]
        if (ComPlayers.includes(game.teams[game.whoTurn].player)) {
            console.log("skipping", game.teams[game.whoTurn].player)
            this.endTurn();
        };
    };

    cityCards = {  
        // Citizens
        athensCitizen : {img : "AthenianCitizen", name : "Athenian Citizen", atk : 0, hp : 1, type :  "athens", text : "Citizen", food : 1, money : 0, desc : "A worker for your city mine and farm", id: "Citizen",},
        thebesCitizen : {img : "ThebanCitizen", name : "Theban Citizen", atk : 0, hp : 1, type :  "thebes", text : "Citizen", food : 1, money : 0, desc : "A worker for your city mine and farm", id: "Citizen",},
        spartaCitizen : {img : "SpartanCitizen", name : "Spartan Citizen", atk : 1, hp : 1, type :  "sparta", text : "Citizen", food : 1, money : 0, desc : "A worker for your city mine and farm, can join the battle and fight", id: "Citizen",},
        troyCitizen : {img : "TrojanCitizen", name : "Trojan Citizen", atk : 0, hp : 1, type :  "troy", text : "Citizen", food : 1, money : 0, desc : "A worker for your city mine and farm", id: "Citizen",},
        // City
        athensCity : {img : "Athens", name : "Athens", atk : "", hp : 10, type : "athens", text : "City"},
        thebesCity : {img : "Thebes", name : "Thebes", atk : "", hp : 10, type : "thebes", text : "City"},
        spartaCity : {img : "Sparta", name : "Sparta", atk : "", hp : 10, type : "sparta", text : "City"},
        troyCity : {img : "Troy", name : "Troy", atk : "", hp : 10, type : "troy", text : "City"},
        // Equipment
        swordEquip :{img : "Sword", name : "Sword", atk : "+1", hp :"0", type : "equipment", text : "Equipment", food : 0, money : 3, desc : "A sharp sword to strenghthen your units", id: "Equip",},
        helmetEquip :{img : "Helmet", name : "Helmet", atk : "+1", hp :"+1", type : "equipment", text : "Equipment", food : 0, money : 5, desc : "A tough helmet to strenghthen your units", id: "Equip",},
        shieldEquip :{img : "Shield", name : "Shield", atk : "0", hp :"+1",  type : "equipment", text : "Equipment", food : 0, money : 3, desc : "A large shield to protect your units", id: "Equip",},
        cuirassEquip :{img : "Cuirass", name : "Cuirass", atk : "", hp : "", type : "equipment", text : "<strong>+1 Plating</strong>", food : 0, money : 5, desc : "A resiliant cuirass to protect your units, blocks all damage from the next attack against a unit", id: "Equip",},
        // Extra
        wallsBuilding : {img : "Walls", name : "Walls", atk : 0, hp : 20, type : "building", text : "Structure", food : 0, money : 15, desc : "Sturdy walls that protect your city from invaders", id: "Building",},
        wildBoarBeast : {img : "WildBoar", name : "Wild Boar", atk : 1, hp : 1, type : "beast", text : "Beast", desc : "Scary beast roarrr",},
        // Soldiers
        athensSoldier : {img : "AthenianHoplite", name : "Athenian Hoplite", atk : 1, hp : 2, type : "athens", text : "Soldier", food : 2, money : 1, desc : "A brave soldier for your army", id: "Soldier",},
        thebesSoldier : {img : "ThebanHoplite", name : "Theban Hoplite", atk : 1, hp : 2, type : "thebes", text : "Soldier", food : 2, money : 1, desc : "A brave soldier for your army", id: "Soldier",},
        spartaSoldier : {img : "SpartanHoplite", name : "Spartan Hoplite", atk : 1, hp : 2, type : "sparta", text : "Soldier", food : 2, money : 1, desc : "A brave soldier for your army", id: "Soldier",},
        troySoldier : {img : "TrojanWarrior", name : "Trojan Warrior", atk : 1, hp : 2, type : "troy", text : "Soldier", food : 2, money : 1, desc : "A brave soldier for your army", id: "Soldier",},
        // Archers
        athensArcher : {img : "AthenianArcher", name : "Athenian Archer", atk : 1, hp : 1, type : "athens", text : "Archer", food : 2, money : 2, desc : "A nimble archer for your army", id: "Archer",},
        thebesArcher : {img : "ThebanArcher", name : "Theban Archer", atk : 1, hp : 1, type : "thebes", text : "Archer", food : 2, money : 2, desc : "A nimble archer for your army", id: "Archer",},
        spartaArcher : {img : "SpartanArcher", name : "Spartan Archer", atk : 1, hp : 1, type : "sparta", text : "Archer", food : 2, money : 2, desc : "A nimble archer for your army", id: "Archer",},
        troyArcher : {img : "TrojanArcher", name : "Trojan Archer", atk : 1, hp : 1, type : "troy", text : "Archer", food : 2, money : 2, desc : "A nimble archer for your army", id: "Archer",},
        // Horsemen
        athensHorseman : {img : "AthenianHorseman", name : "Athenian Horseman", atk : 2, hp : 3, type : "athens", text : "Cavalry", fontsize : "15px", food : 3, money : 2, desc : "A powerful unit with good damage and high health", id: "Horseman",},
        thebesHorseman : {img : "ThebanHorseman", name : "Theban Horseman", atk : 2, hp : 3, type : "thebes", text : "Cavalry", food : 3, money : 2, desc : "A powerful unit with good damage and high health", id: "Horseman",},
        spartaHorseman : {img : "SpartanHorseman", name : "Spartan Horseman", atk : 2, hp : 3, type : "sparta", text : "Cavalry", food : 3, money : 2, desc : "A powerful unit with good damage and high health", id: "Horseman",},
        troyHorseman : {img : "TrojanHorseman", name : "Trojan Horseman", atk : 2, hp : 3, type : "troy", text : "Cavalry", food : 3, money : 2, desc : "A powerful unit with good damage and high health", id: "Horseman",},
        // Siege Engines
        ramSiege : {img : "Ram", name : "Battering Ram", atk : 5, hp : 10, type : "universal", text : "Siege Engine", food : 1, money : 5, desc : "Can only attack city walls, a valuable asset for city raids", id: "Siege",},       
        trojanHorseSiege : {img : "TrojanHorse", name : "Trojan Horse", atk : 0, hp : 10, type : "universal", text : "Siege Engine", desc : "A unique seige engine that allows your units to directly attack a city, ignoring walls", id: "HorseSiege",},
        // Heroes
        athensHero1 : {img : "Theseus", name : "Theseus", atk : 5, hp : 7, type : "athens", text : "Liberator of Athens", food : 15, money : 5, desc : "Reduces damage from incoming attacks by 1", id: "Hero",},
        athensHero2 : {img : "Pericles", name : "Pericles", atk : 1, hp : 4, type : "athens", text : "Voice of Democracy", food : 10, money : 5, desc : "Increases your citizen capacity by 1, reduces cost of city buildings by 2$", id: "Hero",},
        athensHero3 : {img : "Alcibiades", name : "Alcibiades", atk : 3, hp : 1, type : "athens", text : "Disloyal", food : 3, money : 1, desc : "Every time Alcibiades dies, he is transferred to the team who killed him", id: "Hero",},
        athensHero4 : {img : "Hippolytus", name : "Hippolytus", atk : 2, hp : 3, type : "athens", text : "Call of the Wild", food : 6, money : 2, desc : "Each turn Hippolytus can spawn a 1/1 wild boar (max 3) (can't spawn more when in battle)", id: "Hero",},
        athensHero5 : {img : "Cecrops", name : "Cecrops", atk : 2, hp : 4, type : "athens", text : "Experienced Ruler", food : 7, money : 3, desc : "Increases gold Production and food Production by 1", id: "Hero",},
        spartaHero1 : {img : "Leonidas", name : "Leonidas", atk : 4, hp : 7, type : "sparta", text : "Spartan Rally", food : 12, money : 3, desc : "All units in the army have +1+1", id: "Hero",},
        spartaHero2 : {img : "Menelaus", name : "Menelaus", atk : 4, hp : 6, type : "sparta", text : "Duelist", food : 10, money : 2, desc : "Can only be attacked by his opposite, and they can't leave the battlefield", id: "Hero",},
        spartaHero3 : {img : "Helen", name : "Helen", atk : 1, hp : 5, type : "sparta", text : "Casus Belli", food : 5, money : 1, desc : "You can give Helen to any civilisation; whilst she lives, that civilisation has to fight a civilisation of your choice", id: "Hero",},
        spartaHero4 : {img : "Brasidas", name : "Brasidas", atk : 3, hp : 4, type : "sparta", text : "Product of the Agoge", food : 8, money : 2, desc : "Producing Soldiers costs  1F 1$", id: "Hero",},
        spartaHero5 : {img : "Orestes", name : "Orestes", atk : 2, hp : 5, type : "sparta", text : "Vengeful", food : 5, money : 3, desc : "Everytime Orestes is attacked, he deals double his attack back", id: "Hero",},
        thebesHero1 : {img : "Cadmus", name : "Cadmus", atk : 4, hp : 7, type : "thebes", text : "Founder's Spirit", food : 25, money : 5, desc : "When you buy Cadmus, choose a building of your choice and add it to your city", id: "Hero",},
        thebesHero2 : {img : "Oedipus", name : "Oedipus", atk : 3, hp : 5, type : "thebes", text : "Ill-Fated", food : 17, money : 3, desc : "Can exchange 3 health to block an event", id: "Hero",},
        thebesHero3 : {img : "Dionysus", name : "Dionysus", atk : 1, hp : 6, type : "thebes", text : "Festival Rites", food : 17, money : 3, desc : "All citizens work twice as hard (double yields)", id: "Hero",},
        thebesHero4 : {img : "Tiresias", name : "Tiresias", atk : 0, hp : 3, type : "thebes", text : "Foresight", food : 3, money : 2, desc : "Tiresias can block an event of your choice (he goes to the Underworld)", id: "Hero",},
        thebesHero5 : {img : "Semele", name : "Semele", atk : 1, hp : 3, type : "thebes", text : "Divine Favour", food : 5, money : 2, desc : "Can use 1 food to heal a target in your city by 1 (once a turn)", id: "Hero",},
        troyHero1 : {img : "Hector", name : "Hector", atk : 4, hp : 7, type : "troy", text : "Sweeping Attack", food : 5, money : 15, desc : "Hector deals half damage to the two neighbouring cards to the target", id: "Hero",},
        troyHero2 : {img : "Priam", name : "Priam", atk : 2, hp : 5, type : "troy", text : "Royal Wealth", food : 3, money : 5, desc : "All money Yields +1", id: "Hero",},
        troyHero3 : {img : "Aeneas", name : "Aeneas", atk : 3, hp : 6, type : "troy", text : "Divine Protection", food : 2, money : 10, desc : "When Aeneas is about to die, he is removed from the battle and returned to his city (1 use)", id: "Hero",},
        troyHero4 : {img : "Paris", name : "Paris", atk : 3, hp : 4, type : "troy", text : "Master Archer", food : 2, money : 7, desc : "Attacks as an archer", id: "Hero",},
        troyHero5 : {img : "Hecuba", name : "Hecuba", atk : 1, hp : 3, type : "troy", text : "Royal Influence", food : 1, money : 5, desc : "Can spend 1$ to heal a unit by 1 (once per turn)", id: "Hero",},
    };

    delphiCards = {
        // Disasters
        droughtEvent : {img : "Drought", name : "Drought", atk : "", hp : "", type : "event", text : "Disaster"},
        earthquakeEvent : {img : "Earthquake", name : "Earthquake", atk : "", hp : "", type : "event", text : "Disaster"},
        volcanoEvent : {img : "Volcano", name : "Volcano", atk : "", hp : "", type : "event", text : "Disaster"},
        stormEvent : {img : "Storm", name : "Storm", atk : "", hp : "", type : "event", text : "Disaster"},
        plagueEvent : {img : "Plague", name : "Plague", atk : "", hp : "", type : "event", text : "Disaster"},
        raidersEvent : {img : "Raiders", name : "Raiders", atk : "", hp : "", type : "event", text : "Disaster"},
        raidersSoldier : {img : "Raiders", name : "Raider", atk : 2, hp : 2, type : "event", text : "Warrior"},
        // Events
        bountifulHarvestEvent : {img : "BountifulHarvest", name : "Bountiful Harvest", atk : "", hp : "", type : "event", text : "Event"},
        festivalEvent : {img : "Festival", name : "Festival", atk : "", hp : "", type : "event", text : "Event"},
        goldenAgeEvent : {img : "GoldenAge", name : "Golden Age", atk : "", hp : "", type : "event", text : "Event"},
        goldrushEvent : {img : "GoldRush", name : "Gold Rush", atk : "", hp : "", type : "event", text : "Event"},
        underworldEvent : {img : "Underworld", name : "Open the Underworld", atk : "", hp : "", type : "event", text : "Event", fontsize : "14px"},
        // Wars
        pelopWar : {img : "PeloponnesianWar", name : "Peloponnesian War", atk : "", hp : "", type : "war", text : "War"},
        sicilWar : {img : "SicilianExpedition", name : "Sicilian Expedition", atk : "", hp : "", type : "war", text : "War"},
        trojanWar : {img : "TrojanWar", name : "Trojan War", atk : "", hp : "", type : "war", text : "War"},
        leuctraWar : {img : "Leuctra", name : "Battle of Leuctra", atk : "", hp : "", type : "war", text : "War"},
        // Monsters
        cyclopsMonster : {img : "Cyclops", name : "Cyclops", atk : 4, hp : 8, type : "monster", text : "Monster"},
        minotaurMonster : {img : "Minotaur", name : "Minotaur", atk : 5, hp : 5, type : "monster", text : "Monster"},
        hydraMonster : {img : "Hydra", name : "Hydra", atk : 3, hp : 7, type : "monster", text : "Monster"},
        medusaMonster : {img : "Medusa", name : "Medusa", atk : 3, hp : 6, type : "monster", text : "Monster"},
        cretanBullMonster : {img : "CretanBull", name : "Cretan Bull", atk : 2, hp : 6, type : "monster", text : "Monster"},
        cerberusMonster : {img : "Cerberus", name : "Cerberus", atk : 4, hp : 7, type : "monster", text : "Monster"},
        chimeraMonster : {img : "Chimera", name : "Chimera", atk : 4, hp : 5, type : "monster", text : "Monster"},
        nemeanLionMonster : {img : "NemeanLion", name : "Nemean Lion", atk : 4, hp : 3, type : "monster", text : "Thick-Skinned"},
        fleeceGuardianMonster : {img : "GoldenFleece", name : "Guardian of the Fleece", atk : 3, hp : 7, type : "monster", text : "A Fleecy Prize", fontsize : "14px"},
    };

    delphiHeroes = {
        // Heroes
        delphiHero1 : {img : "Heracles", name : "Heracles", atk : 6, hp : 9, type : "universal", text : "Destroyer of Cities", money : 20, food : 0, desc : "Deals full damage to walls"},
        delphiHero2 : {img : "Perseus", name : "Perseus", atk : 4, hp : 8, type : "universal", text : "Medusa's Gaze", money : 18, food : 0, desc : "Perseus reveals Medusa's head, reducing all enemies' health by 1 and preventing them from attacking next turn (once every 5 turns)"},
        delphiHero3 : {img : "Achilles", name : "Achilles", atk : 3, hp : 9, type : "universal", text : "Unrelenting Rage", money : 20, food : 0, desc : "Every time Achilles loses HP, his attack increases by that much, healing reverses this"},
        delphiHero4 : {img : "Jason", name : "Jason", atk : 3, hp : 5, type : "universal", text : "Heroic Connections", money : 12, food : 0, desc : "Recruiting heroes is 2$ cheaper"},
        delphiHero5 : {img : "Odysseus", name : "Odysseus", atk : 3, hp : 6, type : "universal", text : "Quick Witted", money : 12, food : 0, desc : "Can create a Trojan Horse Seige Engine for 2$ that allows units to bypass walls and attack the city itself"},
        delphiHero6 : {img : "Diomedes", name : "Diomedes", atk : 4, hp : 6, type : "universal", text : "Battle Hunger", money : 15, food : 0, desc : "Diomedes takes 1 less damage from non heroes"},
        delphiHero7 : {img : "Ajax", name : "Ajax", atk : 5, hp : 8, type : "universal", text : "Bulwark", money : 18, food : 0, desc : "Ajax's neighboring cards have +0+3"},
        delphiHero8 : {img : "Minos", name : "Minos", atk : 3, hp : 5, type : "universal", text : "Royal Guard", money : 14, food : 0, desc : "Hiring Minos gives you 2 soldiers, 2 archers and a horseman"},
        delphiHero9 : {img : "Nestor", name : "Nestor", atk : 2, hp : 5, type : "universal", text : "Age-old Wisdom", money : 10, food : 0, desc : "Reduces effect of all disasters by 50%"},
        delphiHero10 : {img : "Atalanta", name : "Atalanta", atk : 3, hp : 3, type : "universal", text : "Swift-footed", money : 8, food : 0, desc : "Atalanta can attack straight away when entering a battlefield and attacks like an archer"},
        delphiHero11 : {img : "Medea", name : "Medea", atk : 1, hp : 5, type : "universal", text : "Nullify", money : 12, food : 0, desc : "Causes a target to lose 2-2 (can be used once a battle)"},
        delphiHero12 : {img : "Ariadne", name : "Ariadne", atk : 1, hp : 3, type : "universal", text : "Loyal Companion", money : 8, food : 0, desc : "Can use one food to heal a unit by one (once a turn)"},
        delphiHero13 : {img : "Hippolyta", name : "Hippolyta", atk : 4, hp : 3, type : "universal", text : "Master Huntress", money : 12, food : 0, desc : "Attacks as an archer, can spawn a wild boar companion every battle"},
        delphiHero14 : {img : "Penelope", name : "Penelope", atk : 1, hp : 3, type : "universal", text : "Faithful", money : 8, food : 0, desc : "Can use one food to heal a unit by one (once a turn)"},
        delphiHero15 : {img : "Meleager", name : "Meleager", atk : 4, hp : 4, type : "universal", text : "Hunter's Instinct", money : 12, food : 0, desc : "Takes one less damage from units with less attack than him"},
        delphiHero16 : {img : "Bellerophon", name : "Bellerophon", atk : 4, hp : 2, type : "universal", text : "Monster Hunter", money : 8, food : 0, desc : "Bellerophon cannot be damaged by monsters"},
        delphiHero17 : {img : "Daedalus", name : "Daedalus", atk : 1, hp : 4, type : "universal", text : "Master Craftsman", money : 12, food : 0, desc : "Can give a target unit a random piece of equipment for 2$ (once a turn)"},    
        delphiHero18 : {img : "Pandora", name : "Pandora", atk : 1, hp : 3, type : "universal", text : "Chaotic Curiosity", money : 6, food : 0, desc : "Pandora can activate the next event card all heroes in between are put at the bottom of the event pile, and the event affects a random city (50% for other cities; 50% for her own) (one use)"}, 
        delphiHero19 : {img : "Cassandra", name : "Cassandra", atk : 1, hp : 3, type : "universal", text : "Cursed Prophecy", money : 6, food : 0, desc : "You can block an event from happening to you, but the last two events are shuffled back into the event pile (Can only be used every other event)"}, 
        delphiHero20 : {img : "Neoptolemus", name : "Neoptolemus", atk : 1, hp : 5, type : "universal", text : "His Father's Rage", money :10, food : 0, desc : "His attack doubles everytime he attacks"}, 
        delphiHero21 : {img : "Clytemnestra", name : "Clytemnestra", atk : 2, hp : 3, type : "universal", text : "10 Year Grudge", money : 8, food : 0, desc : "You can use X food/money to add X to clytemnestra's attack for a single hit against a hero"}, 
        delphiHero22 : {img : "Orpheus", name : "Orpheus", atk : 1, hp : 3, type : "universal", text : "Master of Music", money : 10, food : 0, desc : "Orpheus boosts morale, healing all units in his army by 1 (can only be used once per battle)"}, 
        delphiHero23 : {img : "Patroclus", name : "Patroclus", atk : 2, hp : 5, type : "universal", text : "Brotherly Love", money : 14, food : 0, desc : "Choose a companion for Patroclus: his attack becomes equal to his companion until they dies. If Patroclus dies first, deal two damage to his companion"},
        delphiHero24 : {img : "Agamemnon", name : "Agamemnon", atk : 3, hp : 6, type : "universal", text : "Leader of the Greeks", money : 14, food : 0, desc : "Gives all soldiers +1+1"},
    };

    board = {
        athensCity : {
            t1: {s1: "noCard",s2: "noCard",s3: "noCard",s4: "noCard",s5: "noCard",s6: "noCard"},
            t2: {s1: "noCard",s2: "noCard",s3: "noCard",s4: "noCard",s5: "noCard",s6: "noCard"},
            t3: {s1: "noCard",s2: "noCard",s3: "noCard",s4: "noCard",s5: "noCard",s6: "noCard"},
        },
        spartaCity : {
            t1: {s1: "noCard",s2: "noCard",s3: "noCard",s4: "noCard",s5: "noCard",s6: "noCard"},
            t2: {s1: "noCard",s2: "noCard",s3: "noCard",s4: "noCard",s5: "noCard",s6: "noCard"},
            t3: {s1: "noCard",s2: "noCard",s3: "noCard",s4: "noCard",s5: "noCard",s6: "noCard"},
        },
        troyCity : {
            t1: {s1: "noCard",s2: "noCard",s3: "noCard",s4: "noCard",s5: "noCard",s6: "noCard"},
            t2: {s1: "noCard",s2: "noCard",s3: "noCard",s4: "noCard",s5: "noCard",s6: "noCard"},
            t3: {s1: "noCard",s2: "noCard",s3: "noCard",s4: "noCard",s5: "noCard",s6: "noCard"},
        },
        thebesCity : {
            t1: {s1: "noCard",s2: "noCard",s3: "noCard",s4: "noCard",s5: "noCard",s6: "noCard"},
            t2: {s1: "noCard",s2: "noCard",s3: "noCard",s4: "noCard",s5: "noCard",s6: "noCard"},
            t3: {s1: "noCard",s2: "noCard",s3: "noCard",s4: "noCard",s5: "noCard",s6: "noCard"},
        },
        delphi : {
            t1: {s1: "noCard",s2: "noCard",s3: "noCard",s4: "noCard",s5: "noCard",s6: "noCard"},
            t2: {s1: "noCard",s2: "noCard",s3: "noCard",s4: "noCard",s5: "noCard",s6: "noCard"},
            t3: {s1: "noCard",s2: "noCard",s3: "noCard",s4: "noCard",s5: "noCard",s6: "noCard"},
            t4: {s1: "noCard",s2: "noCard",s3: "noCard",s4: "noCard",s5: "noCard",s6: "noCard"},
        },
        left : {
            t1: {s1: "noCard",s2: "noCard",s3: "noCard",s4: "noCard",s5: "noCard",s6: "noCard"},
            t2: {s1: "noCard",s2: "noCard",s3: "noCard",s4: "noCard",s5: "noCard",s6: "noCard"},
        },
        top : {
            t1: {s1: "noCard",s2: "noCard",s3: "noCard",s4: "noCard",s5: "noCard",s6: "noCard"},
            t2: {s1: "noCard",s2: "noCard",s3: "noCard",s4: "noCard",s5: "noCard",s6: "noCard"},
        },
        right : {
            t1: {s1: "noCard",s2: "noCard",s3: "noCard",s4: "noCard",s5: "noCard",s6: "noCard"},
            t2: {s1: "noCard",s2: "noCard",s3: "noCard",s4: "noCard",s5: "noCard",s6: "noCard"},
        },
        bottom : {
            t1: {s1: "noCard",s2: "noCard",s3: "noCard",s4: "noCard",s5: "noCard",s6: "noCard"},
            t2: {s1: "noCard",s2: "noCard",s3: "noCard",s4: "noCard",s5: "noCard",s6: "noCard"},
        },
    };

    nav = {
        "athensCity-t1": ["top-t2", "left-t1"],
        "athensCity-t2": ["left-t2"],
        "athensCity-t3": ["top-t1"],
        "spartaCity-t1": ["top-t1", "right-t1"],
        "spartaCity-t2": ["right-t2"],
        "spartaCity-t3": ["top-t2"],
        "thebesCity-t1": ["bottom-t1", "right-t2"],
        "thebesCity-t2": ["right-t1"],
        "thebesCity-t3": ["bottom-t2"],
        "troyCity-t1": ["bottom-t2", "left-t2"],
        "troyCity-t2": ["left-t1"],
        "troyCity-t3": ["bottom-t1"],
        "left-t1": ["athensCity-t1", "troyCity-t2", "delphi-t1"],
        "left-t2": ["troyCity-t1", "athensCity-t2", "delphi-t4"],
        "top-t1": ["athensCity-t3", "spartaCity-t1", "delphi-t2"],
        "top-t2": ["spartaCity-t3", "athensCity-t1", "delphi-t1"],
        "right-t1": ["thebesCity-t3", "spartaCity-t1", "delphi-t2"],
        "right-t2": ["spartaCity-t3", "thebesCity-t1", "delphi-t3"],
        "bottom-t1": ["thebesCity-t1", "troyCity-t3", "delphi-t3"],
        "bottom-t2": ["troyCity-t1", "thebesCity-t3", "delphi-t4"],
        "delphi-t1": ["top-t2", "left-t1"],
        "delphi-t2": ["top-t1", "right-t1"],
        "delphi-t3": ["bottom-t1", "right-t2"],
        "delphi-t4": ["bottom-t2", "left-t2"],
    };

    atkNav = {
        "athensCity-t1": ["athensCity-t2", "athensCity-t3"],
        "athensCity-t2": ["athensCity-t1", "athensCity-t3", "athensCity"],
        "athensCity-t3": ["athensCity-t1", "athensCity-t2", "athensCity"],
        "spartaCity-t1": ["spartaCity-t2", "spartaCity-t3"],
        "spartaCity-t2": ["spartaCity-t1", "spartaCity-t3", "spartaCity"],
        "spartaCity-t3": ["spartaCity-t1", "spartaCity-t2", "spartaCity"],
        "thebesCity-t1": ["thebesCity-t2", "thebesCity-t3"],
        "thebesCity-t2": ["thebesCity-t1", "thebesCity-t3", "thebesCity"],
        "thebesCity-t3": ["thebesCity-t1", "thebesCity-t2", "thebesCity"],
        "troyCity-t1": ["troyCity-t2", "troyCity-t3"],
        "troyCity-t2": ["troyCity-t1", "troyCity-t3", "troyCity"],
        "troyCity-t3": ["troyCity-t1", "troyCity-t2", "troyCity"],
        "delphi-t1": ["delphi-t2", "delphi-t3", "delphi-t4"],
        "delphi-t2": ["delphi-t1", "delphi-t3", "delphi-t4"],
        "delphi-t3": ["delphi-t1", "delphi-t2", "delphi-t4"],
        "delphi-t4": ["delphi-t1", "delphi-t2", "delphi-t3"],
        "top-t1":["top-t2"],
        "top-t2":["top-t1"],
        "left-t1":["left-t2"],
        "left-t2":["left-t1"],
        "right-t1":["right-t2"],
        "right-t2":["right-t1"],
        "bottom-t1":["bottom-t2"],
        "bottom-t2":["bottom-t1"],
    };

    getGame = async () => {
        const game = await base.fetch(`open-lobbies/${this.props.params.lobbyname}`, { context: this });
        if (!game.slots) return;
        game.teams = {};
        game.teams.athens = {city: "Athens"};
        game.teams.sparta = {city: "Sparta"};
        game.teams.thebes = {city: "Thebes"};
        game.teams.troy = {city: "Troy"};
        const randomNum = max => {return Math.ceil(Math.random()*max)};
        if (game.city==="choice") {
            game.teams.athens.player = game.slots.p1.filled;
            game.teams.sparta.player = game.slots.p2.filled;
            game.teams.thebes.player = game.slots.p3.filled;
            game.teams.troy.player = game.slots.p4.filled;
        } else {
            const cities = ["athens", "sparta", "thebes", "troy"];
            let rndInt = randomNum(cities.length)-1;
            game.teams[cities[rndInt]].player = game.slots.p1.filled
            cities.splice(rndInt, 1);
            rndInt = randomNum(cities.length)-1;
            game.teams[cities[rndInt]].player = game.slots.p2.filled
            cities.splice(rndInt, 1);
            rndInt = randomNum(cities.length)-1;
            game.teams[cities[rndInt]].player = game.slots.p3.filled
            cities.splice(rndInt, 1);
            rndInt = randomNum(cities.length)-1;
            game.teams[cities[rndInt]].player = game.slots.p4.filled
            cities.splice(rndInt, 1);
        }
        Object.keys(game.teams).forEach(team => {
            game.teams[team].level = 1;
            game.teams[team].citizens = {
                number: 2,
                mine: 0,
                farm: 0
            };
            game.teams[team].buildings = {
                city: true,
                walls: false,
                barracks: false,
                archerRange: false,
                stables: false,
                workshop: false,
            };
            game.teams[team].money = 200;
            game.teams[team].moneyIncome = 0;
            game.teams[team].food = 200;
            game.teams[team].foodIncome = 0;
            game.teams[team].bought = {card: true};
        });
        const cities = ["athens", "sparta", "thebes", "troy"];
        const rndInt = randomNum(4)-1;
        game.whoTurn = cities[rndInt];
        game.order = [...cities.slice(rndInt), ...cities.slice(0, rndInt)];
        game.board = this.board;
        game.cards = {
            athensCity : {img : "Athens", name : "Athens", atk : "", hp : "", type : "athens", text : "City", cityHealth: 10,},
            thebesCity : {img : "Thebes", name : "Thebes", atk : "", hp : "", type : "thebes", text : "City", cityHealth: 10,},
            spartaCity : {img : "Sparta", name : "Sparta", atk : "", hp : "", type : "sparta", text : "City", cityHealth: 10,},
            troyCity : {img : "Troy", name : "Troy", atk : "", hp : "", type : "troy", text : "City", cityHealth: 10,},
        };
        game.cardID = 0;
        game.delphiHeroes = shuffle(Object.keys(this.delphiHeroes));
        game.delphi = {hero1: false, hero2: false};
        game.heroHire = false;
        delete game.slots;
        delete game.readyCount;
        delete game.started;
        delete game.playerCount;
        this.setState({ game });
        this.props.openGame(game);
    }

    endTurn = () => {
        const game = {...this.state.game};
        const team = game.whoTurn;
        game.teams[team].food = game.teams[team].food+game.teams[team].foodIncome;
        game.teams[team].money = game.teams[team].money+game.teams[team].moneyIncome;
        let nextTurn = game.order.indexOf(game.whoTurn)+1;
        if (nextTurn===4) {nextTurn = 0};
        game.whoTurn = game.order[nextTurn];
        game.heroHire = false;
        const cards = game.cards;
        Object.keys(cards).forEach(c => cards[c].moved=false);
        this.setState({ game });
    }

    buyingCard = (card) => {
        const game = {...this.state.game};
        card.type = game.whoTurn;
        const canPlace = {city: `${card.type}-city`, citizen: card.text};
        const movingCard = {card, canPlace};
        const team = game.whoTurn;
        game.teams[team].food = game.teams[team].food-card.food;
        game.teams[team].money = game.teams[team].money-card.money;
        this.setState({ movingCard, game });
    }

    updateTeam = (team, city) => {
        const game = {...this.state.game};
        game.teams[city] = team;
        this.setState({ game });
    }

    moveMovingCard = (e) => {
        const movingCardDiv = document.querySelector(".moving-card");
        if (!movingCardDiv.firstElementChild) return;
        TweenLite.to(movingCardDiv, 0.1, {
            css: {
              left: e.pageX-70,
              top: e.pageY-50
            }
        });
    };

    placeCard = (cardSlot) => {
        const id = cardSlot.id.split("-");
        const card = {...this.state.movingCard.card};
        const game = {...this.state.game};
        const team = game.whoTurn;
        game.teams[team].bought[card.name] = true;
        game.cards[cardSlot.id] = JSON.parse(JSON.stringify(card));
        game.board[id[0]][id[1]][id[2]]=game.cards[cardSlot.id];
        const movingCard = {};
        this.setState({ game, movingCard });
    }

    placeCitizen = () => {
        const movingCard = {};
        this.setState({ movingCard });
    };

    showMoves = (card, currentSlot) => {
        if (card.moved) return;
        const user = JSON.parse(localStorage.getItem("SFGUser"));
        const game = {...this.state.game};
        const team = Object.keys(game.teams).filter(t => game.teams[t].player===user.name)[0];
        if (team !== game.whoTurn) return;
        const playerTeam = Object.keys(game.teams).filter(team => {return game.teams[team].player===user.name})[0];
        if (card.type!==playerTeam) return;
        if (this.state.selectedCard===card) {
            const selectedCard = {};
            const canMoveTo = ["nowhere"];
            const canAttack = ["nowhere"];
            this.setState({ selectedCard, canMoveTo, canAttack });
            return;
        }
        const selectedCard = card;
        const currentBattlefield = currentSlot.slice(0,currentSlot.length-3);
        let CitizenCard = "";
        if (card.id==="Citizen") {
            CitizenCard = "Citizen";
        };
        const canMoveTo = [...this.nav[currentBattlefield], CitizenCard];
        const canAttack = this.atkNav[currentBattlefield];
        this.setState({ selectedCard, canMoveTo, canAttack });
    };

    moveCard = (newSlot) => {
        const card = this.state.selectedCard;
        const game = {...this.state.game};
        const cards = game.cards;
        const canMoveTo = ["nowhere"];
        card.moved = true;
        cards[newSlot] = card;
        cards[Object.keys(cards).filter(c => {return cards[c]===card})[0]] = null;
        const selectedCard = {};
        this.setState({ game, selectedCard, canMoveTo });
    };

    attackCard = (attackedSlot) => {
        if (!this.state.selectedCard) return;
        const attackingCard = this.state.selectedCard;
        const game = {...this.state.game};
        const cards = game.cards;
        const attackedCard = cards[attackedSlot];
        if (attackedCard.text==="City") {
            attackedCard.cityHealth = attackedCard.cityHealth - attackingCard.atk;
        } else {
            attackingCard.hp = attackingCard.hp - attackedCard.atk;
            attackedCard.hp = attackedCard.hp - attackingCard.atk;
            if (attackedCard.hp < 1) {
                cards[Object.keys(cards).filter(c => {return cards[c]===attackedCard})[0]] = null;
            };
            if (attackingCard.hp < 1) {
                cards[Object.keys(cards).filter(c => {return cards[c]===attackingCard})[0]] = null;
            };
        };
        attackingCard.moved = true;
        const canMoveTo = ["nowhere"];
        const canAttack = ["nowhere"];
        const selectedCard = {};
        this.setState({ game, selectedCard, canMoveTo, canAttack });
    };

    openCityShop = (shop) => {
        if (shop==="cityCenter") {
            const shopType = "cityCenter";
            this.setState({ shopType });
        };
    };

    closeCityShop = () => {
        const shopType = "unitShop";
        this.setState({ shopType });
    };

    upLevel = (t, cost) => {
        const game = {...this.state.game};
        const team = game.teams[t];
        team.level = team.level+1;
        team.money = team.money-cost.money;
        team.food = team.food-cost.food;
        this.setState({ game });
    };

    buyBuilding = (t, building, cost) => {
        const game = {...this.state.game};
        const team = game.teams[t];
        team.buildings[building] = true;
        team.money = team.money-cost;
        this.setState({ game });
    };

    heroForHire = () => {
        const game = {...this.state.game};
        const user = JSON.parse(localStorage.getItem("SFGUser"));
        const team = Object.keys(game.teams).filter(t => game.teams[t].player===user.name)[0];
        if ((game.delphi.hero1 && game.delphi.hero2) || game.heroHire) return;
        const delphiHeroes = game.delphiHeroes;
        if (!game.delphi.hero1) {
            game.delphi.hero1 = JSON.parse(JSON.stringify(this.delphiHeroes[delphiHeroes[0]]));
            game.delphiHeroes = [...delphiHeroes].slice(1);
        } else if (!game.delphi.hero2) {
            game.delphi.hero2 = JSON.parse(JSON.stringify(this.delphiHeroes[delphiHeroes[0]]));
            game.delphiHeroes = [...delphiHeroes].slice(1);
        };
        game.heroHire = true;
        game.teams[team].money--;
        this.setState({ game });
    };
    
    cardSlotProps = {
        placeCard: (cardSlot) => this.placeCard(cardSlot),
        showMoves: (card, cardSlot) => this.showMoves(card, cardSlot),
        moveCard: (newSlot) => this.moveCard(newSlot),
        attackCard: (attackedSlot) => this.attackCard(attackedSlot),
    };

    render() {
        
        return (
            <>
            <Board 
                game={this.state.game} 
                updateTeam={this.updateTeam}
                goToPage={this.props.goToPage}
                moveMovingCard={this.moveMovingCard}
                placeCitizen={this.placeCitizen}
                openCityShop={this.openCityShop}
                cardSlotProps={this.cardSlotProps}
                movingCard={this.state.movingCard}
                cards={this.state.game.cards}
                selectedCard={this.state.selectedCard}
                canMoveTo={this.state.canMoveTo}
                canAttack={this.state.canAttack}
                delphiHeroCards={this.delphiHeroes}
                heroForHire={this.heroForHire}
                buyingCard={this.buyingCard}
            />
            <Hud 
                game={this.state.game} 
                cards={this.cityCards}
                endTurn={this.endTurn}
                buyingCard={this.buyingCard}
                shopType={this.state.shopType}
                closeCityShop={this.closeCityShop}
                upLevel={this.upLevel}
                buyBuilding={this.buyBuilding}
            />
            </>
        )};
}   

export default Play;