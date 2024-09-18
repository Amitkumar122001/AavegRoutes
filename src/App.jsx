import React, { useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  Marker,
  useLoadScript,
  InfoWindow,
  Polyline,
} from "@react-google-maps/api";
import MultipleStopIcon from "@mui/icons-material/MultipleStop";
import startpoint from "./startpoint.png";
import endpoint from "./endpoint.png";
import reachstop from "./reachstop.png";
const gogSecretApi = import.meta.env.VITE_GOOGLE_API_KEY;
const gogdecodeApi = import.meta.env.VITE_GOOGLE_API_KEY_COM;
import axios from "axios";
const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "97vh",
};
const mapOptions = {
  styles: [
    {
      featureType: "administrative",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#d6e2e6",
        },
      ],
    },
    {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#cddbe0",
        },
      ],
    },
    {
      featureType: "administrative",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#7492a8",
        },
      ],
    },
    {
      featureType: "administrative.neighborhood",
      elementType: "labels.text.fill",
      stylers: [
        {
          lightness: 25,
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "landscape.man_made",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#d6e2e6",
        },
      ],
    },
    {
      featureType: "landscape.man_made",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#cddbe0",
        },
      ],
    },
    {
      featureType: "landscape.natural",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#dae6eb",
        },
      ],
    },
    {
      featureType: "landscape.natural",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#7492a8",
        },
      ],
    },
    {
      featureType: "landscape.natural.terrain",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#d6e2e6",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#588ca4",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.icon",
      stylers: [
        {
          saturation: -100,
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#cae7a8",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#bae6a1",
        },
      ],
    },
    {
      featureType: "poi.sports_complex",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#c6e8b3",
        },
      ],
    },
    {
      featureType: "poi.sports_complex",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#bae6a1",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#41626b",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.icon",
      stylers: [
        {
          saturation: -25,
        },
        {
          lightness: 10,
        },
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#f7fdff",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#beced4",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#eef3f5",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#cddbe0",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#edf3f5",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#cddbe0",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "labels.icon",
      stylers: [
        {
          saturation: -70,
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#588ca4",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#008cb5",
        },
      ],
    },
    {
      featureType: "transit.station.airport",
      elementType: "geometry.fill",
      stylers: [
        {
          saturation: -100,
        },
        {
          lightness: -5,
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#a6cbe3",
        },
      ],
    },
  ],
};
let center = { lat: 28.50259, lng: 77.09211 };

export const App = () => {
  const [route1, setRoute1] = useState([
    {
      stopName: "Rithala Metro Station",
      lat: 28.7208148314683,
      lng: 77.1072326326453,
    },
    {
      stopName: "Rohini West Metro Station",
      lat: 28.7149322796169,
      lng: 77.1155397678812,
    },
    {
      stopName: "Rohini East Metro Station",
      lat: 28.7076950333106,
      lng: 77.125965522055,
    },
    {
      stopName: "Madhuban Chowk",
      lat: 28.7029003048604,
      lng: 77.1302251964295,
    },
    {
      stopName: "Sarswati Vihar, C Block Bus Stand",
      lat: 28.7001208636373,
      lng: 77.1252323000804,
    },
    {
      stopName: "Peeragarhi Bus Stand",
      lat: 28.6750390456179,
      lng: 77.0939430341394,
    },
    {
      stopName: "Sunder Apartment",
      lat: 28.6660803216493,
      lng: 77.0924795464255,
    },
    {
      stopName: "District Centre Outer Ring Road",
      lat: 28.6327487680647,
      lng: 77.08133923427,
    },
    {
      stopName: "SBI District Centre",
      lat: 28.6303997076215,
      lng: 77.082547223993,
    },
    { stopName: "C2B Janakpuri", lat: 28.6219360384281, lng: 77.088286965426 },
    { stopName: "C2D Janakpuri", lat: 28.6172767978807, lng: 77.0883283124546 },
    { stopName: "Dabri Mor", lat: 28.611981228897, lng: 77.0860205385903 },
    {
      stopName: "SFS Flat Sec-2 Power House",
      lat: 28.6003247589691,
      lng: 77.0714594050027,
    },
    {
      stopName: "Sector 6 Telephone Exchange",
      lat: 28.5932150121883,
      lng: 77.0712424755311,
    },
    {
      stopName: "Airforce Naval Officers Enclave / Sec. 7 (Princess Park)",
      lat: 28.5876329923392,
      lng: 77.0667830759967,
    },
    {
      stopName: "Ganpati Chowk, Dwarka Sector 7",
      lat: 28.58171,
      lng: 77.07045,
    },
    {
      stopName: "Shree Radha Appartment (Queen's Vally School)",
      lat: 28.57815,
      lng: 77.07084,
    },
    { stopName: "Dwarka Sector-9, Red Light", lat: 28.57221, lng: 77.06604 },
    {
      stopName: "DGS Chowk, SFS Flats Sec-22, Dwarka",
      lat: 28.563154,
      lng: 77.062807,
    },
    {
      stopName: "Dwarka Sector-21 Metro station",
      lat: 28.55251,
      lng: 77.05736,
    },
    {
      stopName: "DLF Downtown, Gurugram",
      lat: 28.5031790780442,
      lng: 77.0935179597013,
    },
    { stopName: "Cyber Hub", lat: 28.4969980874033, lng: 77.0913102120333 },
    {
      stopName: "Building No. 9A/9B",
      lat: 28.4958961511396,
      lng: 77.0928045668896,
    },
    {
      stopName: "Cyber Green / 7A",
      lat: 28.4935194976618,
      lng: 77.092070255064,
    },
    {
      stopName: "Building No. 5 Cyber city",
      lat: 28.4888226052502,
      lng: 77.0913975481717,
    },
    {
      stopName: "Building No. 10 Back Side",
      lat: 28.4917799260525,
      lng: 77.088110017789,
    },
  ]);
  const [route2, setRoute2] = useState([
    { stopName: "Model Town Metro station", lat: 28.702519, lng: 77.193647 },
    {
      stopName: "Azadpur Metro Station",
      lat: 28.707271540647398,
      lng: 77.18091630753007,
    },
    {
      stopName: "Azadpur Terminal",
      lat: 28.707689273515328,
      lng: 77.17822111802911,
    },
    { stopName: "Prem Bari Pull", lat: 28.700018, lng: 77.158405 },
    {
      stopName: "Wazirpur Depo",
      lat: 28.691936335231066,
      lng: 77.15371681350337,
    },
    {
      stopName: "Telephone exchange Bus Stand",
      lat: 28.686500735609425,
      lng: 77.15133195295114,
    },
    {
      stopName: "Shakarpur village/ shiv mandir Bus Stand",
      lat: 28.680866,
      lng: 77.143138,
    },
    {
      stopName: "Punjabi Bagh Flyover(End Point)",
      lat: 28.666104483331274,
      lng: 77.13405983152677,
    },
    {
      stopName: "Rajdhani Collage",
      lat: 28.654971418612636,
      lng: 77.12553634325441,
    },
    {
      stopName: "Raja Garden",
      lat: 28.651773911229082,
      lng: 77.12462984692982,
    },
    {
      stopName: "Rajouri garden Metro Station",
      lat: 28.648953727955362,
      lng: 77.12274526006502,
    },
    {
      stopName: "Tagore Garden Metro Station",
      lat: 28.643699783006756,
      lng: 77.11291410487858,
    },
    {
      stopName: "Subhash Nagar Metro Station",
      lat: 28.640310980518223,
      lng: 77.10500196512231,
    },
    {
      stopName: "Tilak Nagar",
      lat: 28.634490205483164,
      lng: 77.09745352925006,
    },
    { stopName: "Hari Nagar Depo", lat: 28.62411, lng: 77.10196 },
    { stopName: "Tihar Jail", lat: 28.619213162268434, lng: 77.10444706708589 },
    { stopName: "Nangal Raya", lat: 28.61308163515939, lng: 77.10962413247682 },
    { stopName: "Janak Setu", lat: 28.61068, lng: 77.11391 },
    { stopName: "Kirbi Place", lat: 28.604372, lng: 77.127305 },
    {
      stopName: "Ambiance Mall",
      lat: 28.50549345769843,
      lng: 77.09512218996971,
    },
    { stopName: "DLF Downtown", lat: 28.5031790780442, lng: 77.09351795970137 },
    {
      stopName: "Cyber City, Building no. 10 backside",
      lat: 28.495203400310285,
      lng: 77.08665050826644,
    },
    {
      stopName: "Airtel Overbridge",
      lat: 28.49095726735649,
      lng: 77.08214399538032,
    },
    {
      stopName: "Genpact Overbridge",
      lat: 28.486069054473756,
      lng: 77.07747472694588,
    },
    {
      stopName: "World Tech. Park",
      lat: 28.463538293775883,
      lng: 77.05320235943562,
    },
    {
      stopName: "Medanta Hospital (SAS Tower)",
      lat: 28.440740208878132,
      lng: 77.04124717320505,
    },
    {
      stopName: "Baktawar Chowk",
      lat: 28.435499344292985,
      lng: 77.04823148748126,
    },
    {
      stopName: "Subhash Chowk",
      lat: 28.427877354950706,
      lng: 77.03747258113435,
    },
    {
      stopName: "Opps. JMD Megapolis",
      lat: 28.419809872295893,
      lng: 77.03978619527483,
    },
    {
      stopName: "Radisson Hotel Gurugram",
      lat: 28.41595932302753,
      lng: 77.04092303961752,
    },
    {
      stopName: "C. D. Chowk",
      lat: 28.410843465359793,
      lng: 77.04245229690542,
    },
    {
      stopName: "Opps. Vipul Trade Centre",
      lat: 28.40692408942627,
      lng: 77.04358792338245,
    },
    {
      stopName: "Opps. Bestech Park, Sec 48",
      lat: 28.404221638037857,
      lng: 77.04433721771005,
    },
    {
      stopName: "Vatika Chowk",
      lat: 28.401927083967966,
      lng: 77.04493315600232,
    },
    {
      stopName: "Genpact Sector 69",
      lat: 28.401040267904133,
      lng: 77.0388555029118,
    },
    {
      stopName: "Unitech Vista, Sector 70",
      lat: 28.40068007752936,
      lng: 77.0187489604732,
    },
    {
      stopName: "Air India/BMW Group, Sec 75",
      lat: 28.40071484957543,
      lng: 77.01035067027895,
    },
  ]);
  const [route3, setRoute3] = useState([
    {
      stopName: "Tilak Pul, Uttam Nagar Bus Stand",
      lat: 28.6215479799006,
      lng: 77.0699825495485,
    },
    {
      stopName: "C-1 Bus Stand, Janakpuri",
      lat: 28.6181480130068,
      lng: 77.0769851566642,
    },
    {
      stopName: "A-3 Bus Stand, Janakpuri",
      lat: 28.6196223389463,
      lng: 77.0791907765603,
    },
    {
      stopName: "C-2 Bus Stand, Janakpuri",
      lat: 28.6218231911509,
      lng: 77.0842107874811,
    },
    {
      stopName: "C2B Bus Stand Janakpuri",
      lat: 28.6212021702936,
      lng: 77.0889467115062,
    },
    {
      stopName: "C4E Bus Stand Janakpuri",
      lat: 28.6172699356759,
      lng: 77.0883227675944,
    },
    {
      stopName: "C3 Central Market Bus Stand Janakpuri",
      lat: 28.6153919769359,
      lng: 77.0925832959734,
    },
    {
      stopName: "C5A Bus Stand Janakpuri",
      lat: 28.6147894949988,
      lng: 77.0976696799786,
    },
    {
      stopName: "Desu Colony Bus Stand",
      lat: 28.6111519857294,
      lng: 77.0988932772703,
    },
    {
      stopName: "Sagarpur Vashisht park",
      lat: 28.6092097770896,
      lng: 77.1009031430098,
    },
    {
      stopName: "D Block Bus Stand, Janakpuri",
      lat: 28.610953905143,
      lng: 77.1036551917461,
    },
    {
      stopName: "Lajwanti Garden Bus Stand",
      lat: 28.6139943461274,
      lng: 77.106241118682,
    },
    {
      stopName: "Nangal Raya Bus Stand",
      lat: 28.6130810374796,
      lng: 77.1096259165943,
    },
    {
      stopName: "Janak Setu Bus Stand",
      lat: 28.6106235214187,
      lng: 77.1138688285768,
    },
    {
      stopName: "Kibri Place Bus Stand",
      lat: 28.6048473568123,
      lng: 77.1282283896617,
    },
    {
      stopName: "Thimiyan Marg Bus Stand",
      lat: 28.602774314062,
      lng: 77.1334857636734,
    },
    {
      stopName: "Carriappa Marg Bus Stand",
      lat: 28.6003312137135,
      lng: 77.1397366825722,
    },
    {
      stopName: "RR Line Bus Stand",
      lat: 28.5961371270165,
      lng: 77.1503840795935,
    },
    {
      stopName: "Army Golf Club Bus Stand",
      lat: 28.5929858018609,
      lng: 77.1584506230046,
    },
    { stopName: "Dhaula Kuan", lat: 28.5932364914976, lng: 77.1629453183462 },
    {
      stopName: "Taj Palace Bus Stand",
      lat: 28.5964891742615,
      lng: 77.1700763905826,
    },
    {
      stopName: "Bapu Dham Bus Stand",
      lat: 28.5991597171687,
      lng: 77.1752137562743,
    },
    {
      stopName: "Malcha Marg Bus Stand",
      lat: 28.6017861004099,
      lng: 77.180216392146,
    },
    {
      stopName: "11 Murti Bus Stand",
      lat: 28.6110221198796,
      lng: 77.1907532876596,
    },
    {
      stopName: "Talkatora Bus Stand",
      lat: 28.6211555493725,
      lng: 77.1937646005305,
    },
    { stopName: "RML Bus Stand", lat: 28.6258004378245, lng: 77.2039268085105 },
    {
      stopName: "Gurudwara Bangla Sahib Bus Stand",
      lat: 28.6253576249291,
      lng: 77.2095415234897,
    },
    {
      stopName: "P S Parliament Bus Stand",
      lat: 28.6251572562153,
      lng: 77.214068834974,
    },
    {
      stopName: "Jantar Mantar Bus Stand",
      lat: 28.6263650018428,
      lng: 77.220306401559,
    },
    {
      stopName: "Tolstoy Marg Bus Stand",
      lat: 28.6263644132571,
      lng: 77.22030371935,
    },
    {
      stopName: "Barahkhamba Crossing Bus Stand",
      lat: 28.6278694478959,
      lng: 77.2254946055837,
    },
    {
      stopName: "Modern School Bus Stand",
      lat: 28.6277932211089,
      lng: 77.228473782065,
    },
    {
      stopName: "Mandi House Metro Station",
      lat: 28.6256881999252,
      lng: 77.23419033473,
    },
    {
      stopName: "Tilak Bridge Bus Stand",
      lat: 28.625442911766,
      lng: 77.2395209769162,
    },
    { stopName: "ITO Bus Stand", lat: 28.6281394787779, lng: 77.245032550122 },
  ]);
  const [route4, setRoute4] = useState([
    {
      stopName: "Tilak Pul, Uttam Nagar Bus Stand",
      lat: 28.6215479799006,
      lng: 77.0699825495485,
    },
    {
      stopName: "C-1 Bus Stand, Janakpuri",
      lat: 28.6181480130068,
      lng: 77.0769851566642,
    },
    {
      stopName: "A-3 Bus Stand, Janakpuri",
      lat: 28.6196223389463,
      lng: 77.0791907765603,
    },
    {
      stopName: "C-2 Bus Stand, Janakpuri",
      lat: 28.6218231911509,
      lng: 77.0842107874811,
    },
    {
      stopName: "C2B Bus Stand Janakpuri",
      lat: 28.6212021702936,
      lng: 77.0889467115062,
    },
    {
      stopName: "C4E Bus Stand Janakpuri",
      lat: 28.6172699356759,
      lng: 77.0883227675944,
    },
    {
      stopName: "C3 Central Market Bus Stand Janakpuri",
      lat: 28.6153919769359,
      lng: 77.0925832959734,
    },
    {
      stopName: "C5A Bus Stand Janakpuri",
      lat: 28.6147894949988,
      lng: 77.0976696799786,
    },
    {
      stopName: "Desu Colony Bus Stand",
      lat: 28.6111519857294,
      lng: 77.0988932772703,
    },
    {
      stopName: "SagarPur Vashisht park",
      lat: 28.6092097770896,
      lng: 77.1009031430098,
    },
    {
      stopName: "D Block Bus Stand, Janak Puri",
      lat: 28.610953905143,
      lng: 77.1036551917461,
    },
    {
      stopName: "Lajwanti Garden Bus Stand",
      lat: 28.6139943461274,
      lng: 77.106241118682,
    },
    {
      stopName: "Nangal Raya Bus Stand",
      lat: 28.6130810374796,
      lng: 77.1096259165943,
    },
    {
      stopName: "Janak Setu Bus Stand",
      lat: 28.6106235214187,
      lng: 77.1138688285768,
    },
    {
      stopName: "Kibri Place Bus Stand",
      lat: 28.6048473568123,
      lng: 77.1282283896617,
    },
    {
      stopName: "Thimiyan Marg Bus Stand",
      lat: 28.602774314062,
      lng: 77.1334857636734,
    },
    {
      stopName: "Carriappa Marg Bus Stand",
      lat: 28.6003312137135,
      lng: 77.1397366825722,
    },
    {
      stopName: "RR Line Bus Stand",
      lat: 28.5961371270165,
      lng: 77.1503840795935,
    },
    {
      stopName: "Army Golf Club Bus Stand",
      lat: 28.5929858018609,
      lng: 77.1584506230046,
    },
    { stopName: "Dhaula Kuan", lat: 28.5932364914976, lng: 77.1629453183462 },
    {
      stopName: "Satya Niketan/ Durgabai Deshmukh South Campus Metro St.",
      lat: 28.5887143942816,
      lng: 77.1700266007016,
    },
    {
      stopName: "South Moti Bagh (Ring Road)",
      lat: 28.581885401647,
      lng: 77.1742686697037,
    },
    {
      stopName: "Aradhana Enclave",
      lat: 28.57448774974,
      lng: 77.1785558246087,
    },
    {
      stopName: "Hyatt Hotel/ Bikaji Cama Palace",
      lat: 28.5700882851193,
      lng: 77.1855484617523,
    },
    { stopName: "Nauroji Nagar", lat: 28.5695907076431, lng: 77.1954757594898 },
    { stopName: "S.J. Hospital", lat: 28.5696480398382, lng: 77.2045597746827 },
    {
      stopName: "AIIMS Ring Road",
      lat: 28.5691263547479,
      lng: 77.2126852616723,
    },
    {
      stopName: "South Extension",
      lat: 28.568774294024,
      lng: 77.2206768004707,
    },
    { stopName: "Andrews Ganj", lat: 28.5659428769438, lng: 77.2305523147224 },
    {
      stopName: "Moolchand Metro",
      lat: 28.5641339996013,
      lng: 77.2336338614617,
    },
    {
      stopName: "Lady Shri Ram College",
      lat: 28.5589462886067,
      lng: 77.2372835184084,
    },
    {
      stopName: "Kailash Colony Metro Station",
      lat: 28.5550250298592,
      lng: 77.2426277976491,
    },
    { stopName: "Nehru Place", lat: 28.5486104786066, lng: 77.2492094425828 },
    {
      stopName: "Nehru Place Terminal",
      lat: 28.5482202142808,
      lng: 77.2557932260767,
    },
    { stopName: "Okhla NSIC", lat: 28.5543530467614, lng: 77.2651414645138 },
    {
      stopName: "Sukhdev Vihar Depot",
      lat: 28.5546641895322,
      lng: 77.2716105811573,
    },
    {
      stopName: "Apollo Hospital/ Jasola Apollo Metro St.",
      lat: 28.5392850675919,
      lng: 77.283093697742,
    },
    {
      stopName: "DLF Tower B, Jasola",
      lat: 28.5402423786036,
      lng: 77.289912422706,
    },
  ]);
  const [route5, setRoute5] = useState([
    { stopName: "Najafgarh Terminal", lat: 28.61495, lng: 76.97734 },
    { stopName: "Jharoda Crossing", lat: 28.61445, lng: 76.9811 },
    { stopName: "Health Centre", lat: 28.61415, lng: 76.98518 },
    { stopName: "Najafgarh Delhi Gate", lat: 28.61272, lng: 76.9862 },
    { stopName: "Tuda Mandi", lat: 28.61259, lng: 76.9914 },
    {
      stopName: "Power house, Najafgarh",
      lat: 28.613061406457962,
      lng: 76.99575243715222,
    },
    { stopName: "Sai Baba Mandir", lat: 28.61363, lng: 76.99936 },
    { stopName: "Nangli Sakrawati", lat: 28.61465, lng: 77.00333 },
    { stopName: "Nangli Sakrawati Crossing", lat: 28.6162, lng: 77.00704 },
    { stopName: "Arjun Park (State Bank)", lat: 28.61835, lng: 77.01326 },
    { stopName: "Nangli Dairy", lat: 28.61997, lng: 77.01789 },
    { stopName: "kakrola more", lat: 28.61921, lng: 77.028874 },
    { stopName: "Dwarka More", lat: 28.6177, lng: 77.03195 },
    { stopName: "NSIT", lat: 28.608341, lng: 77.035008 },
    { stopName: "Sec. 13 Dwarka", lat: 28.605914, lng: 77.036266 },
    { stopName: "Sector - 13 M.R.V. School", lat: 28.604003, lng: 77.039143 },
    { stopName: "Dwarka Sec 3-4", lat: 28.6028, lng: 77.04313 },
    { stopName: "DPS Matiyala", lat: 28.60464, lng: 77.046185 },
    { stopName: "Matiyala Crossing", lat: 28.60517, lng: 77.05204 },
    { stopName: "Rajapuri", lat: 28.60426, lng: 77.05481 },
    { stopName: "Madhu Vihar", lat: 28.59988, lng: 77.06138 },
    { stopName: "Dwarka Sector 2&6", lat: 28.59724, lng: 77.06537 },
    { stopName: "J M International School", lat: 28.59624, lng: 77.0683 },
    { stopName: "Dwarka Sec 1", lat: 28.59447, lng: 77.0736 },
    { stopName: "Dwarka/Palam flyover", lat: 28.5839, lng: 77.09155 },
    { stopName: "Palam Colony", lat: 28.58144, lng: 77.09597 },
    { stopName: "Indian Oil Station", lat: 28.57757, lng: 77.10864 },
    { stopName: "Palam Airport", lat: 28.56952, lng: 77.12351 },
    { stopName: "Palam More CGDA", lat: 28.56815, lng: 77.12987 },
    { stopName: "Arjun Path", lat: 28.57521, lng: 77.14715 },
    { stopName: "Vasant Village", lat: 28.57502, lng: 77.16008 },
    { stopName: "Swami Malai Mandir", lat: 28.56828, lng: 77.16489 },
    { stopName: "R K Puram Sec-5", lat: 28.56304, lng: 77.16821 },
    { stopName: "Vasant vihar depot", lat: 28.5586, lng: 77.17231 },
    {
      stopName: "Munirka / Family Planning Association of India",
      lat: 28.55694,
      lng: 77.17459,
    },
    { stopName: "Munirka DDA Flats", lat: 28.55541, lng: 77.17683 },
    { stopName: "IIT Hostel", lat: 28.54997, lng: 77.18563 },
    { stopName: "Jia Sarai", lat: 28.54854, lng: 77.18904 },
    { stopName: "IIT Gate", lat: 28.54589, lng: 77.19708 },
    {
      stopName: "Panchsheel Club / Sarvpriya Vihar",
      lat: 28.54391,
      lng: 77.20493,
    },
    { stopName: "Panchsheel Enclave", lat: 28.54317, lng: 77.21369 },
    { stopName: "North Point (Nursing Home)", lat: 28.542792, lng: 77.218455 },
    { stopName: "Swami Nagar", lat: 28.54236, lng: 77.22466 },
    { stopName: "Masjid Moth", lat: 28.54078, lng: 77.23618 },
    { stopName: "OS Communications", lat: 28.54279, lng: 77.24147 },
    { stopName: "Pamposh Enclave", lat: 28.54361, lng: 77.24381 },
    { stopName: "Nehru Place", lat: 28.54747, lng: 77.25384 },
  ]);

  const [showRoute1, setShowRoute1] = useState(true);
  const [showRoute2, setShowRoute2] = useState(true);
  const [showRoute3, setShowRoute3] = useState(true);
  const [showRoute4, setShowRoute4] = useState(true);
  const [showRoute5, setShowRoute5] = useState(true);

  const [polyline1, setPolyline1] = useState([]);
  const [polyline2, setPolyline2] = useState([]);
  const [polyline3, setPolyline3] = useState([]);
  const [polyline4, setPolyline4] = useState([]);
  const [polyline5, setPolyline5] = useState([]);

  const [map, setMap] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  // route 1------------------------------
  useEffect(() => {
    const maxWaypoints = 23; // Google Maps API allows 25 waypoints (including origin and destination)

    if (route1.length > 1) {
      const segments = [];
      let start = 0;

      while (start < route1.length - 1) {
        const end = Math.min(start + maxWaypoints + 1, route1.length - 1);

        let origin = {
          location: {
            latLng: {
              latitude: route1[start].lat,
              longitude: route1[start].lng,
            },
          },
        };
        let destination = {
          location: {
            latLng: {
              latitude: route1[end].lat,
              longitude: route1[end].lng,
            },
          },
        };
        let intermediatesArr = route1?.slice(start + 1, end).map((coord) => {
          return {
            location: {
              latLng: {
                latitude: coord.lat,
                longitude: coord.lng,
              },
            },
          };
        });

        let requestbody = {
          origin: origin,
          destination: destination,
          intermediates: intermediatesArr,
          travelMode: "DRIVE",
        };

        const header = {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": gogdecodeApi,
          "X-Goog-FieldMask":
            "routes.duration,routes.distanceMeters,routes.polyline,routes.legs.polyline",
        };

        segments.push(
          axios.post(
            "https://routes.googleapis.com/directions/v2:computeRoutes",
            requestbody,
            { headers: header }
          )
        );

        start = end;
      }

      Promise.all(segments)
        .then((responses) => {
          let allPolyline = [];
          responses.forEach((res) => {
            let decode = window.google.maps.geometry?.encoding?.decodePath(
              res.data.routes[0]?.polyline?.encodedPolyline
            );
            allPolyline = allPolyline.concat(decode);
          });

          setPolyline1(allPolyline);
        })
        .catch((err) => console.log(err));
    }
  }, [route1, directionsService]);
  // route 2--------------------------------
  useEffect(() => {
    const maxWaypoints = 23; // Google Maps API allows 25 waypoints (including origin and destination)

    if (route2.length > 1) {
      const segments = [];
      let start = 0;

      while (start < route2.length - 1) {
        const end = Math.min(start + maxWaypoints + 1, route2.length - 1);

        let origin = {
          location: {
            latLng: {
              latitude: route2[start].lat,
              longitude: route2[start].lng,
            },
          },
        };
        let destination = {
          location: {
            latLng: {
              latitude: route2[end].lat,
              longitude: route2[end].lng,
            },
          },
        };
        let intermediatesArr = route2?.slice(start + 1, end).map((coord) => {
          return {
            location: {
              latLng: {
                latitude: coord.lat,
                longitude: coord.lng,
              },
            },
          };
        });

        let requestbody = {
          origin: origin,
          destination: destination,
          intermediates: intermediatesArr,
          travelMode: "DRIVE",
        };

        const header = {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": gogdecodeApi,
          "X-Goog-FieldMask":
            "routes.duration,routes.distanceMeters,routes.polyline,routes.legs.polyline",
        };

        segments.push(
          axios.post(
            "https://routes.googleapis.com/directions/v2:computeRoutes",
            requestbody,
            { headers: header }
          )
        );

        start = end;
      }

      Promise.all(segments)
        .then((responses) => {
          let allPolyline = [];
          responses.forEach((res) => {
            let decode = window.google.maps.geometry?.encoding?.decodePath(
              res.data.routes[0]?.polyline?.encodedPolyline
            );
            allPolyline = allPolyline.concat(decode);
          });

          setPolyline2(allPolyline);
        })
        .catch((err) => console.log(err));
    }
  }, [route2, directionsService]);
  //  route 3--------------------------
  useEffect(() => {
    const maxWaypoints = 23; // Google Maps API allows 25 waypoints (including origin and destination)

    if (route3.length > 1) {
      const segments = [];
      let start = 0;

      while (start < route3.length - 1) {
        const end = Math.min(start + maxWaypoints + 1, route3.length - 1);

        let origin = {
          location: {
            latLng: {
              latitude: route3[start].lat,
              longitude: route3[start].lng,
            },
          },
        };
        let destination = {
          location: {
            latLng: {
              latitude: route3[end].lat,
              longitude: route3[end].lng,
            },
          },
        };
        let intermediatesArr = route3?.slice(start + 1, end).map((coord) => {
          return {
            location: {
              latLng: {
                latitude: coord.lat,
                longitude: coord.lng,
              },
            },
          };
        });

        let requestbody = {
          origin: origin,
          destination: destination,
          intermediates: intermediatesArr,
          travelMode: "DRIVE",
        };

        const header = {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": gogdecodeApi,
          "X-Goog-FieldMask":
            "routes.duration,routes.distanceMeters,routes.polyline,routes.legs.polyline",
        };

        segments.push(
          axios.post(
            "https://routes.googleapis.com/directions/v2:computeRoutes",
            requestbody,
            { headers: header }
          )
        );

        start = end;
      }

      Promise.all(segments)
        .then((responses) => {
          let allPolyline = [];
          responses.forEach((res) => {
            let decode = window.google.maps.geometry?.encoding?.decodePath(
              res.data.routes[0]?.polyline?.encodedPolyline
            );
            allPolyline = allPolyline.concat(decode);
          });

          setPolyline3(allPolyline);
        })
        .catch((err) => console.log(err));
    }
  }, [route3, directionsService]);
  // route 4
  useEffect(() => {
    const maxWaypoints = 23; // Google Maps API allows 25 waypoints (including origin and destination)

    if (route4.length > 1) {
      const segments = [];
      let start = 0;

      while (start < route4.length - 1) {
        const end = Math.min(start + maxWaypoints + 1, route4.length - 1);

        let origin = {
          location: {
            latLng: {
              latitude: route4[start].lat,
              longitude: route4[start].lng,
            },
          },
        };
        let destination = {
          location: {
            latLng: {
              latitude: route4[end].lat,
              longitude: route4[end].lng,
            },
          },
        };
        let intermediatesArr = route4?.slice(start + 1, end).map((coord) => {
          return {
            location: {
              latLng: {
                latitude: coord.lat,
                longitude: coord.lng,
              },
            },
          };
        });

        let requestbody = {
          origin: origin,
          destination: destination,
          intermediates: intermediatesArr,
          travelMode: "DRIVE",
        };

        const header = {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": gogdecodeApi,
          "X-Goog-FieldMask":
            "routes.duration,routes.distanceMeters,routes.polyline,routes.legs.polyline",
        };

        segments.push(
          axios.post(
            "https://routes.googleapis.com/directions/v2:computeRoutes",
            requestbody,
            { headers: header }
          )
        );

        start = end;
      }

      Promise.all(segments)
        .then((responses) => {
          let allPolyline = [];
          responses.forEach((res) => {
            let decode = window.google.maps.geometry?.encoding?.decodePath(
              res.data.routes[0]?.polyline?.encodedPolyline
            );
            allPolyline = allPolyline.concat(decode);
          });

          setPolyline4(allPolyline);
        })
        .catch((err) => console.log(err));
    }
  }, [route4, directionsService]);
  // route 5------------------------

  // ---------------------------
  useEffect(() => {
    const maxWaypoints = 23; // Google Maps API allows 25 waypoints (including origin and destination)

    if (route5.length > 1) {
      const segments = [];
      let start = 0;

      while (start < route5.length - 1) {
        const end = Math.min(start + maxWaypoints + 1, route5.length - 1);

        let origin = {
          location: {
            latLng: {
              latitude: route5[start].lat,
              longitude: route5[start].lng,
            },
          },
        };
        let destination = {
          location: {
            latLng: {
              latitude: route5[end].lat,
              longitude: route5[end].lng,
            },
          },
        };
        let intermediatesArr = route5?.slice(start + 1, end).map((coord) => {
          return {
            location: {
              latLng: {
                latitude: coord.lat,
                longitude: coord.lng,
              },
            },
          };
        });

        let requestbody = {
          origin: origin,
          destination: destination,
          intermediates: intermediatesArr,
          travelMode: "DRIVE",
        };

        const header = {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": gogdecodeApi,
          "X-Goog-FieldMask":
            "routes.duration,routes.distanceMeters,routes.polyline,routes.legs.polyline",
        };

        segments.push(
          axios.post(
            "https://routes.googleapis.com/directions/v2:computeRoutes",
            requestbody,
            { headers: header }
          )
        );

        start = end;
      }

      Promise.all(segments)
        .then((responses) => {
          let allPolyline = [];
          responses.forEach((res) => {
            let decode = window.google.maps.geometry?.encoding?.decodePath(
              res.data.routes[0]?.polyline?.encodedPolyline
            );
            allPolyline = allPolyline.concat(decode);
          });

          setPolyline5(allPolyline);
        })
        .catch((err) => console.log(err));
    }
  }, [route5, directionsService]);
  // ---------------------------

  const handleCheckBox1 = useCallback(() => {
    setShowRoute1(!showRoute1);
  }, [showRoute1]);
  const handleCheckBox2 = useCallback(() => {
    setShowRoute2(!showRoute2);
  }, [showRoute2]);
  const handleCheckBox3 = useCallback(() => {
    setShowRoute3(!showRoute3);
  }, [showRoute3]);
  const handleCheckBox4 = useCallback(() => {
    setShowRoute4(!showRoute4);
  }, [showRoute4]);
  const handleCheckBox5 = useCallback(() => {
    setShowRoute5(!showRoute5);
  }, [showRoute5]);

  // google map

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: gogSecretApi ?? "",
    libraries,
  });

  // map load
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoaded) {
        const directionsServiceObject =
          new window.google.maps.DirectionsService();
        const directionsRendererObject =
          new window.google.maps.DirectionsRenderer({ suppressMarkers: true });
        setDirectionsService(directionsServiceObject);
        setDirectionsRenderer(directionsRendererObject);
      }
    }, 3000);
    return () => clearTimeout(timeout);
  }, [isLoaded]);
  // map event load
  const onMapLoad = (map) => {
    // console.log(map);
    map.setZoom(10);
    setMap(map);
  };
  if (loadError) {
    return <div>Error loading maps</div>;
  }
  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div>
      <h1 className="text-center text-3xl font-bold p-2">
        <span className="text-[#49c401]">Aaveg</span> Shuttle Upcoming Routes
      </h1>

      <div className="h-full w-full flex max-md:flex-col gap-4 max-md:gap-1">
        <div className="flex justify-center gap-2 item-center p-1 bg-white w-[70%] max-md:w-[100%] max-md:h-[450px] max-md:p-2 rounded-xl">
          <div
            style={{ height: "100%", width: "100%" }}
            className="rounded-xl overflow-hidden flex justify-center items-center"
          >
            {directionsService && directionsRenderer ? (
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={13}
                center={center}
                options={{
                  mapTypeId: "roadmap",
                  disableDefaultUI: false,
                  options: mapOptions,
                }}
                onLoad={onMapLoad}
              >
                {/* route 1 */}
                {showRoute1 && (
                  <>
                    {" "}
                    <Polyline
                      path={polyline1}
                      options={{
                        strokeColor: "orange",
                        strokeOpacity: 0.8,
                        strokeWeight: 3,
                      }}
                    />
                    {route1.map((coord, index, arr) => (
                      <React.Fragment key={index}>
                        <span className="w-fit h-5 ">
                          <Marker
                            key={index}
                            position={coord}
                            icon={{
                              url:
                                index === 0
                                  ? startpoint
                                  : index === arr.length - 1
                                  ? endpoint
                                  : reachstop,
                              scaledSize: new window.google.maps.Size(
                                index === 0 || index === arr.length - 1
                                  ? 40
                                  : 10, // Change size for start/end points
                                index === 0 || index === arr.length - 1
                                  ? 40
                                  : 10 // Change size for start/end points
                              ),
                            }}
                            title={
                              index === 0
                                ? "Start Point"
                                : index === arr.length - 1
                                ? "End Point"
                                : `Stop ${coord.stopName}`
                            }
                          ></Marker>
                        </span>
                      </React.Fragment>
                    ))}
                  </>
                )}
                {/* route2 */}
                {showRoute2 && (
                  <>
                    <Polyline
                      path={polyline2}
                      options={{
                        strokeColor: "yellow",
                        strokeOpacity: 0.8,
                        strokeWeight: 3,
                      }}
                    />
                    {route2.map((coord, index, arr) => (
                      <React.Fragment key={index}>
                        <span className="w-fit h-5 ">
                          <Marker
                            key={index}
                            position={coord}
                            icon={{
                              url:
                                index === 0
                                  ? startpoint
                                  : index === arr.length - 1
                                  ? endpoint
                                  : reachstop,
                              scaledSize: new window.google.maps.Size(
                                index === 0 || index === arr.length - 1
                                  ? 40
                                  : 10, // Change size for start/end points
                                index === 0 || index === arr.length - 1
                                  ? 40
                                  : 10 // Change size for start/end points
                              ),
                            }}
                            title={
                              index === 0
                                ? "Start Point"
                                : index === arr.length - 1
                                ? "End Point"
                                : `Stop ${coord.stopName}`
                            }
                          ></Marker>
                        </span>
                      </React.Fragment>
                    ))}
                  </>
                )}
                {/* route3 */}
                {showRoute3 && (
                  <>
                    {" "}
                    <Polyline
                      path={polyline3}
                      options={{
                        strokeColor: "green",
                        strokeOpacity: 0.8,
                        strokeWeight: 3,
                      }}
                    />
                    {route3.map((coord, index, arr) => (
                      <React.Fragment key={index}>
                        <span className="w-fit h-5 ">
                          <Marker
                            key={index}
                            position={coord}
                            icon={{
                              url:
                                index === 0
                                  ? startpoint
                                  : index === arr.length - 1
                                  ? endpoint
                                  : reachstop,
                              scaledSize: new window.google.maps.Size(
                                index === 0 || index === arr.length - 1
                                  ? 40
                                  : 10, // Change size for start/end points
                                index === 0 || index === arr.length - 1
                                  ? 40
                                  : 10 // Change size for start/end points
                              ),
                            }}
                            title={
                              index === 0
                                ? "Start Point"
                                : index === arr.length - 1
                                ? "End Point"
                                : `Stop ${coord.stopName}`
                            }
                          ></Marker>
                        </span>
                      </React.Fragment>
                    ))}
                  </>
                )}
                {/* route 4 */}
                {showRoute4 && (
                  <>
                    {" "}
                    <Polyline
                      path={polyline4}
                      options={{
                        strokeColor: "red",
                        strokeOpacity: 0.8,
                        strokeWeight: 3,
                      }}
                    />
                    {route4.map((coord, index, arr) => (
                      <React.Fragment key={index}>
                        <span className="w-fit h-5 ">
                          <Marker
                            key={index}
                            position={coord}
                            icon={{
                              url:
                                index === 0
                                  ? startpoint
                                  : index === arr.length - 1
                                  ? endpoint
                                  : reachstop,
                              scaledSize: new window.google.maps.Size(
                                index === 0 || index === arr.length - 1
                                  ? 40
                                  : 10, // Change size for start/end points
                                index === 0 || index === arr.length - 1
                                  ? 40
                                  : 10 // Change size for start/end points
                              ),
                            }}
                            title={
                              index === 0
                                ? "Start Point"
                                : index === arr.length - 1
                                ? "End Point"
                                : `Stop ${coord.stopName}`
                            }
                          ></Marker>
                        </span>
                      </React.Fragment>
                    ))}
                  </>
                )}
                {/* route 5 */}
                {showRoute5 && (
                  <>
                    {" "}
                    <Polyline
                      path={polyline5}
                      options={{
                        strokeColor: "purple",
                        strokeOpacity: 0.8,
                        strokeWeight: 3,
                      }}
                    />
                    {route5.map((coord, index, arr) => (
                      <React.Fragment key={index}>
                        <span className="w-fit h-5 ">
                          <Marker
                            key={index}
                            position={coord}
                            icon={{
                              url:
                                index === 0
                                  ? startpoint
                                  : index === arr.length - 1
                                  ? endpoint
                                  : reachstop,
                              scaledSize: new window.google.maps.Size(
                                index === 0 || index === arr.length - 1
                                  ? 40
                                  : 10, // Change size for start/end points
                                index === 0 || index === arr.length - 1
                                  ? 40
                                  : 10 // Change size for start/end points
                              ),
                            }}
                            title={
                              index === 0
                                ? "Start Point"
                                : index === arr.length - 1
                                ? "End Point"
                                : `Stop ${coord.stopName}`
                            }
                          ></Marker>
                        </span>
                      </React.Fragment>
                    ))}
                  </>
                )}
              </GoogleMap>
            ) : (
              <div>
                <div className="flex items-center justify-center w-full h-full">
                  <p className=" block animate-spin border-4 border-t-blue-500 h-10 w-10 rounded-full "></p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-[30%] max-md:w-full bg-white rounded-xl py-3 px-1">
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-semibold">Details</h1>
            <div className="flex flex-col gap-4">
              <div className="bg-gray-300 p-2 rounded-xl">
                <h1 className="text-black font-semibold text-xl">
                  Select Route
                </h1>

                <div className="flex flex-col gap-1 mt-1">
                  <p className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="Route1"
                      checked={showRoute1}
                      onChange={() => handleCheckBox1()}
                    />
                    <span className="block h-3 w-4 bg-orange-500"></span>
                    <label
                      htmlFor="Route1"
                      className="font-medium flex items-center  gap-1 text-md"
                    >
                      <span className="w-32"> {route1[0].stopName}</span>
                      <MultipleStopIcon />
                      <span className="w-32">
                        {route1[route1.length - 1].stopName}
                      </span>
                    </label>
                  </p>
                  <p className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="Route2"
                      checked={showRoute2}
                      onChange={() => handleCheckBox2()}
                    />
                    <span className="block h-3 w-4 bg-yellow-500"></span>
                    <label
                      htmlFor="Route2"
                      className="font-medium flex items-center  gap-1 text-md"
                    >
                      <span className="w-32"> {route2[0].stopName}</span>
                      <MultipleStopIcon />
                      <span className="w-32">
                        {route2[route2.length - 1].stopName}
                      </span>
                    </label>
                  </p>
                  <p className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="Route3"
                      checked={showRoute3}
                      onChange={() => handleCheckBox3()}
                    />
                    <span className="block h-3 w-4 bg-green-500"></span>
                    <label
                      htmlFor="Route3"
                      className="font-medium flex items-center  gap-1 text-md"
                    >
                      <span className="w-32"> {route3[0].stopName}</span>
                      <MultipleStopIcon />
                      <span className="w-32">
                        {route3[route3.length - 1].stopName}
                      </span>
                    </label>
                  </p>
                  <p className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="Route4"
                      checked={showRoute4}
                      onChange={() => handleCheckBox4()}
                    />
                    <span className="block h-3 w-4 bg-red-500"></span>
                    <label
                      htmlFor="Route4"
                      className="font-medium flex items-center  gap-1 text-md"
                    >
                      <span className="w-32"> {route4[0].stopName}</span>
                      <MultipleStopIcon />
                      <span className="w-32">
                        {route4[route4.length - 1].stopName}
                      </span>
                    </label>
                  </p>

                  <p className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="Route5"
                      checked={showRoute5}
                      onChange={() => handleCheckBox5()}
                    />
                    <span className="block h-3 w-4 bg-purple-500"></span>
                    <label
                      htmlFor="Route5"
                      className="font-medium flex items-center  gap-1 text-md"
                    >
                      <span className="w-32"> {route5[0].stopName}</span>
                      <MultipleStopIcon />
                      <span className="w-32">
                        {route5[route5.length - 1].stopName}
                      </span>
                    </label>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
