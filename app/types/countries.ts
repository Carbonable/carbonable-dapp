export type Countries = Country[]

export interface Country {
  name: Name
  tld: string[]
  cca2: string
  ccn3: string
  cca3: string
  cioc: string
  independent?: boolean
  status: string
  unMember: boolean
  currencies: Currencies
  idd: Idd
  capital: string[]
  altSpellings: string[]
  region: string
  subregion: string
  languages: Languages
  translations: Translations
  latlng: number[]
  landlocked: boolean
  borders: string[]
  area: number
  flag: string
  demonyms: Demonyms
}

export interface Name {
  common: string
  official: string
  native: Native
}

export interface Native {
  nld?: Nld
  pap?: Pap
  prs?: Prs
  pus?: Pus
  tuk?: Tuk
  por?: Por
  eng?: Eng
  swe?: Swe
  sqi?: Sqi
  cat?: Cat
  ara?: Ara
  grn?: Grn
  spa?: Spa
  hye?: Hye
  smo?: Smo
  fra?: Fra
  bar?: Bar
  aze?: Aze
  rus?: Rus
  run?: Run
  deu?: Deu
  ben?: Ben
  bul?: Bul
  bos?: Bos
  hrv?: Hrv
  srp?: Srp
  bel?: Bel
  bjz?: Bjz
  aym?: Aym
  que?: Que
  msa?: Msa
  dzo?: Dzo
  nor?: Nor
  tsn?: Tsn
  sag?: Sag
  gsw?: Gsw
  ita?: Ita
  roh?: Roh
  zho?: Zho
  kon?: Kon
  lin?: Lin
  lua?: Lua
  swa?: Swa
  rar?: Rar
  zdj?: Zdj
  ell?: Ell
  tur?: Tur
  ces?: Ces
  slk?: Slk
  dan?: Dan
  tir?: Tir
  ber?: Ber
  mey?: Mey
  est?: Est
  amh?: Amh
  fin?: Fin
  fij?: Fij
  hif?: Hif
  fao?: Fao
  kat?: Kat
  nfr?: Nfr
  pov?: Pov
  kal?: Kal
  cha?: Cha
  hat?: Hat
  hun?: Hun
  ind?: Ind
  glv?: Glv
  hin?: Hin
  tam?: Tam
  gle?: Gle
  fas?: Fas
  arc?: Arc
  ckb?: Ckb
  isl?: Isl
  heb?: Heb
  jam?: Jam
  nrf?: Nrf
  jpn?: Jpn
  kaz?: Kaz
  kir?: Kir
  khm?: Khm
  gil?: Gil
  kor?: Kor
  lao?: Lao
  sin?: Sin
  sot?: Sot
  lit?: Lit
  ltz?: Ltz
  lav?: Lav
  ron?: Ron
  mlg?: Mlg
  div?: Div
  mah?: Mah
  mkd?: Mkd
  mlt?: Mlt
  mya?: Mya
  cnr?: Cnr
  mon?: Mon
  cal?: Cal
  mfe?: Mfe
  nya?: Nya
  afr?: Afr
  her?: Her
  hgm?: Hgm
  kwn?: Kwn
  loz?: Loz
  ndo?: Ndo
  pih?: Pih
  niu?: Niu
  nno?: Nno
  nob?: Nob
  smi?: Smi
  nep?: Nep
  nau?: Nau
  mri?: Mri
  nzs?: Nzs
  urd?: Urd
  fil?: Fil
  pau?: Pau
  hmo?: Hmo
  tpi?: Tpi
  pol?: Pol
  kin?: Kin
  som?: Som
  slv?: Slv
  ssw?: Ssw
  crs?: Crs
  tha?: Tha
  tgk?: Tgk
  tkl?: Tkl
  tet?: Tet
  ton?: Ton
  tvl?: Tvl
  ukr?: Ukr
  uzb?: Uzb
  lat?: Lat
  vie?: Vie
  bis?: Bis
  nbl?: Nbl
  nso?: Nso
  tso?: Tso
  ven?: Ven
  xho?: Xho
  zul?: Zul
  bwg?: Bwg
  kck?: Kck
  khi?: Khi
  ndc?: Ndc
  nde?: Nde
  sna?: Sna
  toi?: Toi
  zib?: Zib
}

export interface Nld {
  official: string
  common: string
}

export interface Pap {
  official: string
  common: string
}

export interface Prs {
  official: string
  common: string
}

export interface Pus {
  official: string
  common: string
}

export interface Tuk {
  official: string
  common: string
}

export interface Por {
  official: string
  common: string
}

export interface Eng {
  official: string
  common: string
}

export interface Swe {
  official: string
  common: string
}

export interface Sqi {
  official: string
  common: string
}

export interface Cat {
  official: string
  common: string
}

export interface Ara {
  official: string
  common: string
}

export interface Grn {
  official: string
  common: string
}

export interface Spa {
  official: string
  common: string
}

export interface Hye {
  official: string
  common: string
}

export interface Smo {
  official: string
  common: string
}

export interface Fra {
  official: string
  common: string
}

export interface Bar {
  official: string
  common: string
}

export interface Aze {
  official: string
  common: string
}

export interface Rus {
  official: string
  common: string
}

export interface Run {
  official: string
  common: string
}

export interface Deu {
  official: string
  common: string
}

export interface Ben {
  official: string
  common: string
}

export interface Bul {
  official: string
  common: string
}

export interface Bos {
  official: string
  common: string
}

export interface Hrv {
  official: string
  common: string
}

export interface Srp {
  official: string
  common: string
}

export interface Bel {
  official: string
  common: string
}

export interface Bjz {
  official: string
  common: string
}

export interface Aym {
  official: string
  common: string
}

export interface Que {
  official: string
  common: string
}

export interface Msa {
  official: string
  common: string
}

export interface Dzo {
  official: string
  common: string
}

export interface Nor {
  official: string
  common: string
}

export interface Tsn {
  official: string
  common: string
}

export interface Sag {
  official: string
  common: string
}

export interface Gsw {
  official: string
  common: string
}

export interface Ita {
  official: string
  common: string
}

export interface Roh {
  official: string
  common: string
}

export interface Zho {
  official: string
  common: string
}

export interface Kon {
  official: string
  common: string
}

export interface Lin {
  official: string
  common: string
}

export interface Lua {
  official: string
  common: string
}

export interface Swa {
  official: string
  common: string
}

export interface Rar {
  official: string
  common: string
}

export interface Zdj {
  official: string
  common: string
}

export interface Ell {
  official: string
  common: string
}

export interface Tur {
  official: string
  common: string
}

export interface Ces {
  official: string
  common: string
}

export interface Slk {
  official: string
  common: string
}

export interface Dan {
  official: string
  common: string
}

export interface Tir {
  official: string
  common: string
}

export interface Ber {
  official: string
  common: string
}

export interface Mey {
  official: string
  common: string
}

export interface Est {
  official: string
  common: string
}

export interface Amh {
  official: string
  common: string
}

export interface Fin {
  official: string
  common: string
}

export interface Fij {
  official: string
  common: string
}

export interface Hif {
  official: string
  common: string
}

export interface Fao {
  official: string
  common: string
}

export interface Kat {
  official: string
  common: string
}

export interface Nfr {
  official: string
  common: string
}

export interface Pov {
  official: string
  common: string
}

export interface Kal {
  official: string
  common: string
}

export interface Cha {
  official: string
  common: string
}

export interface Hat {
  official: string
  common: string
}

export interface Hun {
  official: string
  common: string
}

export interface Ind {
  official: string
  common: string
}

export interface Glv {
  official: string
  common: string
}

export interface Hin {
  official: string
  common: string
}

export interface Tam {
  official: string
  common: string
}

export interface Gle {
  official: string
  common: string
}

export interface Fas {
  official: string
  common: string
}

export interface Arc {
  official: string
  common: string
}

export interface Ckb {
  official: string
  common: string
}

export interface Isl {
  official: string
  common: string
}

export interface Heb {
  official: string
  common: string
}

export interface Jam {
  official: string
  common: string
}

export interface Nrf {
  official: string
  common: string
}

export interface Jpn {
  official: string
  common: string
}

export interface Kaz {
  official: string
  common: string
}

export interface Kir {
  official: string
  common: string
}

export interface Khm {
  official: string
  common: string
}

export interface Gil {
  official: string
  common: string
}

export interface Kor {
  official: string
  common: string
}

export interface Lao {
  official: string
  common: string
}

export interface Sin {
  official: string
  common: string
}

export interface Sot {
  official: string
  common: string
}

export interface Lit {
  official: string
  common: string
}

export interface Ltz {
  official: string
  common: string
}

export interface Lav {
  official: string
  common: string
}

export interface Ron {
  official: string
  common: string
}

export interface Mlg {
  official: string
  common: string
}

export interface Div {
  official: string
  common: string
}

export interface Mah {
  official: string
  common: string
}

export interface Mkd {
  official: string
  common: string
}

export interface Mlt {
  official: string
  common: string
}

export interface Mya {
  official: string
  common: string
}

export interface Cnr {
  official: string
  common: string
}

export interface Mon {
  official: string
  common: string
}

export interface Cal {
  official: string
  common: string
}

export interface Mfe {
  official: string
  common: string
}

export interface Nya {
  official: string
  common: string
}

export interface Afr {
  official: string
  common: string
}

export interface Her {
  official: string
  common: string
}

export interface Hgm {
  official: string
  common: string
}

export interface Kwn {
  official: string
  common: string
}

export interface Loz {
  official: string
  common: string
}

export interface Ndo {
  official: string
  common: string
}

export interface Pih {
  official: string
  common: string
}

export interface Niu {
  official: string
  common: string
}

export interface Nno {
  official: string
  common: string
}

export interface Nob {
  official: string
  common: string
}

export interface Smi {
  official: string
  common: string
}

export interface Nep {
  official: string
  common: string
}

export interface Nau {
  official: string
  common: string
}

export interface Mri {
  official: string
  common: string
}

export interface Nzs {
  official: string
  common: string
}

export interface Urd {
  official: string
  common: string
}

export interface Fil {
  official: string
  common: string
}

export interface Pau {
  official: string
  common: string
}

export interface Hmo {
  official: string
  common: string
}

export interface Tpi {
  official: string
  common: string
}

export interface Pol {
  official: string
  common: string
}

export interface Kin {
  official: string
  common: string
}

export interface Som {
  official: string
  common: string
}

export interface Slv {
  official: string
  common: string
}

export interface Ssw {
  official: string
  common: string
}

export interface Crs {
  official: string
  common: string
}

export interface Tha {
  official: string
  common: string
}

export interface Tgk {
  official: string
  common: string
}

export interface Tkl {
  official: string
  common: string
}

export interface Tet {
  official: string
  common: string
}

export interface Ton {
  official: string
  common: string
}

export interface Tvl {
  official: string
  common: string
}

export interface Ukr {
  official: string
  common: string
}

export interface Uzb {
  official: string
  common: string
}

export interface Lat {
  official: string
  common: string
}

export interface Vie {
  official: string
  common: string
}

export interface Bis {
  official: string
  common: string
}

export interface Nbl {
  official: string
  common: string
}

export interface Nso {
  official: string
  common: string
}

export interface Tso {
  official: string
  common: string
}

export interface Ven {
  official: string
  common: string
}

export interface Xho {
  official: string
  common: string
}

export interface Zul {
  official: string
  common: string
}

export interface Bwg {
  official: string
  common: string
}

export interface Kck {
  official: string
  common: string
}

export interface Khi {
  official: string
  common: string
}

export interface Ndc {
  official: string
  common: string
}

export interface Nde {
  official: string
  common: string
}

export interface Sna {
  official: string
  common: string
}

export interface Toi {
  official: string
  common: string
}

export interface Zib {
  official: string
  common: string
}

export interface Currencies {
  AWG?: Awg
  AFN?: Afn
  AOA?: Aoa
  XCD?: Xcd
  EUR?: Eur
  ALL?: All
  AED?: Aed
  ARS?: Ars
  AMD?: Amd
  USD?: Usd
  AUD?: Aud
  AZN?: Azn
  BIF?: Bif
  XOF?: Xof
  BDT?: Bdt
  BGN?: Bgn
  BHD?: Bhd
  BSD?: Bsd
  BAM?: Bam
  GBP?: Gbp
  SHP?: Shp
  BYN?: Byn
  BZD?: Bzd
  BMD?: Bmd
  BOB?: Bob
  BRL?: Brl
  BBD?: Bbd
  BND?: Bnd
  SGD?: Sgd
  BTN?: Btn
  INR?: Inr
  BWP?: Bwp
  XAF?: Xaf
  CAD?: Cad
  CHF?: Chf
  CLP?: Clp
  CNY?: Cny
  CDF?: Cdf
  CKD?: Ckd
  NZD?: Nzd
  COP?: Cop
  KMF?: Kmf
  CVE?: Cve
  CRC?: Crc
  CUC?: Cuc
  CUP?: Cup
  ANG?: Ang
  KYD?: Kyd
  CZK?: Czk
  DJF?: Djf
  DKK?: Dkk
  DOP?: Dop
  DZD?: Dzd
  EGP?: Egp
  ERN?: Ern
  MAD?: Mad
  MRU?: Mru
  ETB?: Etb
  FJD?: Fjd
  FKP?: Fkp
  FOK?: Fok
  GEL?: Gel
  GGP?: Ggp
  GHS?: Ghs
  GIP?: Gip
  GNF?: Gnf
  GMD?: Gmd
  GTQ?: Gtq
  GYD?: Gyd
  HKD?: Hkd
  HNL?: Hnl
  HTG?: Htg
  HUF?: Huf
  IDR?: Idr
  IMP?: Imp
  IRR?: Irr
  IQD?: Iqd
  ISK?: Isk
  ILS?: Ils
  JMD?: Jmd
  JEP?: Jep
  JOD?: Jod
  JPY?: Jpy
  KZT?: Kzt
  KES?: Kes
  KGS?: Kgs
  KHR?: Khr
  KID?: Kid
  KRW?: Krw
  KWD?: Kwd
  LAK?: Lak
  LBP?: Lbp
  LRD?: Lrd
  LYD?: Lyd
  LKR?: Lkr
  LSL?: Lsl
  ZAR?: Zar
  MOP?: Mop
  MDL?: Mdl
  MGA?: Mga
  MVR?: Mvr
  MXN?: Mxn
  MKD?: Mkd2
  MMK?: Mmk
  MNT?: Mnt
  MZN?: Mzn
  MUR?: Mur
  MWK?: Mwk
  MYR?: Myr
  NAD?: Nad
  XPF?: Xpf
  NGN?: Ngn
  NIO?: Nio
  NOK?: Nok
  NPR?: Npr
  OMR?: Omr
  PKR?: Pkr
  PAB?: Pab
  PEN?: Pen
  PHP?: Php
  PGK?: Pgk
  PLN?: Pln
  KPW?: Kpw
  PYG?: Pyg
  QAR?: Qar
  RON?: Ron2
  RUB?: Rub
  RWF?: Rwf
  SAR?: Sar
  SDG?: Sdg
  SBD?: Sbd
  SLL?: Sll
  SOS?: Sos
  RSD?: Rsd
  SSP?: Ssp
  STN?: Stn
  SRD?: Srd
  SEK?: Sek
  SZL?: Szl
  SCR?: Scr
  SYP?: Syp
  THB?: Thb
  TJS?: Tjs
  TMT?: Tmt
  TOP?: Top
  TTD?: Ttd
  TND?: Tnd
  TRY?: Try
  TVD?: Tvd
  TWD?: Twd
  TZS?: Tzs
  UGX?: Ugx
  UAH?: Uah
  UYU?: Uyu
  UZS?: Uzs
  VES?: Ves
  VND?: Vnd
  VUV?: Vuv
  WST?: Wst
  YER?: Yer
  ZMW?: Zmw
  ZWB?: Zwb
}

export interface Awg {
  name: string
  symbol: string
}

export interface Afn {
  name: string
  symbol: string
}

export interface Aoa {
  name: string
  symbol: string
}

export interface Xcd {
  name: string
  symbol: string
}

export interface Eur {
  name: string
  symbol: string
}

export interface All {
  name: string
  symbol: string
}

export interface Aed {
  name: string
  symbol: string
}

export interface Ars {
  name: string
  symbol: string
}

export interface Amd {
  name: string
  symbol: string
}

export interface Usd {
  name: string
  symbol: string
}

export interface Aud {
  name: string
  symbol: string
}

export interface Azn {
  name: string
  symbol: string
}

export interface Bif {
  name: string
  symbol: string
}

export interface Xof {
  name: string
  symbol: string
}

export interface Bdt {
  name: string
  symbol: string
}

export interface Bgn {
  name: string
  symbol: string
}

export interface Bhd {
  name: string
  symbol: string
}

export interface Bsd {
  name: string
  symbol: string
}

export interface Bam {
  name: string
  symbol: string
}

export interface Gbp {
  name: string
  symbol: string
}

export interface Shp {
  name: string
  symbol: string
}

export interface Byn {
  name: string
  symbol: string
}

export interface Bzd {
  name: string
  symbol: string
}

export interface Bmd {
  name: string
  symbol: string
}

export interface Bob {
  name: string
  symbol: string
}

export interface Brl {
  name: string
  symbol: string
}

export interface Bbd {
  name: string
  symbol: string
}

export interface Bnd {
  name: string
  symbol: string
}

export interface Sgd {
  name: string
  symbol: string
}

export interface Btn {
  name: string
  symbol: string
}

export interface Inr {
  name: string
  symbol: string
}

export interface Bwp {
  name: string
  symbol: string
}

export interface Xaf {
  name: string
  symbol: string
}

export interface Cad {
  name: string
  symbol: string
}

export interface Chf {
  name: string
  symbol: string
}

export interface Clp {
  name: string
  symbol: string
}

export interface Cny {
  name: string
  symbol: string
}

export interface Cdf {
  name: string
  symbol: string
}

export interface Ckd {
  name: string
  symbol: string
}

export interface Nzd {
  name: string
  symbol: string
}

export interface Cop {
  name: string
  symbol: string
}

export interface Kmf {
  name: string
  symbol: string
}

export interface Cve {
  name: string
  symbol: string
}

export interface Crc {
  name: string
  symbol: string
}

export interface Cuc {
  name: string
  symbol: string
}

export interface Cup {
  name: string
  symbol: string
}

export interface Ang {
  name: string
  symbol: string
}

export interface Kyd {
  name: string
  symbol: string
}

export interface Czk {
  name: string
  symbol: string
}

export interface Djf {
  name: string
  symbol: string
}

export interface Dkk {
  name: string
  symbol: string
}

export interface Dop {
  name: string
  symbol: string
}

export interface Dzd {
  name: string
  symbol: string
}

export interface Egp {
  name: string
  symbol: string
}

export interface Ern {
  name: string
  symbol: string
}

export interface Mad {
  name: string
  symbol: string
}

export interface Mru {
  name: string
  symbol: string
}

export interface Etb {
  name: string
  symbol: string
}

export interface Fjd {
  name: string
  symbol: string
}

export interface Fkp {
  name: string
  symbol: string
}

export interface Fok {
  name: string
  symbol: string
}

export interface Gel {
  name: string
  symbol: string
}

export interface Ggp {
  name: string
  symbol: string
}

export interface Ghs {
  name: string
  symbol: string
}

export interface Gip {
  name: string
  symbol: string
}

export interface Gnf {
  name: string
  symbol: string
}

export interface Gmd {
  name: string
  symbol: string
}

export interface Gtq {
  name: string
  symbol: string
}

export interface Gyd {
  name: string
  symbol: string
}

export interface Hkd {
  name: string
  symbol: string
}

export interface Hnl {
  name: string
  symbol: string
}

export interface Htg {
  name: string
  symbol: string
}

export interface Huf {
  name: string
  symbol: string
}

export interface Idr {
  name: string
  symbol: string
}

export interface Imp {
  name: string
  symbol: string
}

export interface Irr {
  name: string
  symbol: string
}

export interface Iqd {
  name: string
  symbol: string
}

export interface Isk {
  name: string
  symbol: string
}

export interface Ils {
  name: string
  symbol: string
}

export interface Jmd {
  name: string
  symbol: string
}

export interface Jep {
  name: string
  symbol: string
}

export interface Jod {
  name: string
  symbol: string
}

export interface Jpy {
  name: string
  symbol: string
}

export interface Kzt {
  name: string
  symbol: string
}

export interface Kes {
  name: string
  symbol: string
}

export interface Kgs {
  name: string
  symbol: string
}

export interface Khr {
  name: string
  symbol: string
}

export interface Kid {
  name: string
  symbol: string
}

export interface Krw {
  name: string
  symbol: string
}

export interface Kwd {
  name: string
  symbol: string
}

export interface Lak {
  name: string
  symbol: string
}

export interface Lbp {
  name: string
  symbol: string
}

export interface Lrd {
  name: string
  symbol: string
}

export interface Lyd {
  name: string
  symbol: string
}

export interface Lkr {
  name: string
  symbol: string
}

export interface Lsl {
  name: string
  symbol: string
}

export interface Zar {
  name: string
  symbol: string
}

export interface Mop {
  name: string
  symbol: string
}

export interface Mdl {
  name: string
  symbol: string
}

export interface Mga {
  name: string
  symbol: string
}

export interface Mvr {
  name: string
  symbol: string
}

export interface Mxn {
  name: string
  symbol: string
}

export interface Mkd2 {
  name: string
  symbol: string
}

export interface Mmk {
  name: string
  symbol: string
}

export interface Mnt {
  name: string
  symbol: string
}

export interface Mzn {
  name: string
  symbol: string
}

export interface Mur {
  name: string
  symbol: string
}

export interface Mwk {
  name: string
  symbol: string
}

export interface Myr {
  name: string
  symbol: string
}

export interface Nad {
  name: string
  symbol: string
}

export interface Xpf {
  name: string
  symbol: string
}

export interface Ngn {
  name: string
  symbol: string
}

export interface Nio {
  name: string
  symbol: string
}

export interface Nok {
  name: string
  symbol: string
}

export interface Npr {
  name: string
  symbol: string
}

export interface Omr {
  name: string
  symbol: string
}

export interface Pkr {
  name: string
  symbol: string
}

export interface Pab {
  name: string
  symbol: string
}

export interface Pen {
  name: string
  symbol: string
}

export interface Php {
  name: string
  symbol: string
}

export interface Pgk {
  name: string
  symbol: string
}

export interface Pln {
  name: string
  symbol: string
}

export interface Kpw {
  name: string
  symbol: string
}

export interface Pyg {
  name: string
  symbol: string
}

export interface Qar {
  name: string
  symbol: string
}

export interface Ron2 {
  name: string
  symbol: string
}

export interface Rub {
  name: string
  symbol: string
}

export interface Rwf {
  name: string
  symbol: string
}

export interface Sar {
  name: string
  symbol: string
}

export interface Sdg {
  name: string
  symbol: string
}

export interface Sbd {
  name: string
  symbol: string
}

export interface Sll {
  name: string
  symbol: string
}

export interface Sos {
  name: string
  symbol: string
}

export interface Rsd {
  name: string
  symbol: string
}

export interface Ssp {
  name: string
  symbol: string
}

export interface Stn {
  name: string
  symbol: string
}

export interface Srd {
  name: string
  symbol: string
}

export interface Sek {
  name: string
  symbol: string
}

export interface Szl {
  name: string
  symbol: string
}

export interface Scr {
  name: string
  symbol: string
}

export interface Syp {
  name: string
  symbol: string
}

export interface Thb {
  name: string
  symbol: string
}

export interface Tjs {
  name: string
  symbol: string
}

export interface Tmt {
  name: string
  symbol: string
}

export interface Top {
  name: string
  symbol: string
}

export interface Ttd {
  name: string
  symbol: string
}

export interface Tnd {
  name: string
  symbol: string
}

export interface Try {
  name: string
  symbol: string
}

export interface Tvd {
  name: string
  symbol: string
}

export interface Twd {
  name: string
  symbol: string
}

export interface Tzs {
  name: string
  symbol: string
}

export interface Ugx {
  name: string
  symbol: string
}

export interface Uah {
  name: string
  symbol: string
}

export interface Uyu {
  name: string
  symbol: string
}

export interface Uzs {
  name: string
  symbol: string
}

export interface Ves {
  name: string
  symbol: string
}

export interface Vnd {
  name: string
  symbol: string
}

export interface Vuv {
  name: string
  symbol: string
}

export interface Wst {
  name: string
  symbol: string
}

export interface Yer {
  name: string
  symbol: string
}

export interface Zmw {
  name: string
  symbol: string
}

export interface Zwb {
  name: string
  symbol: string
}

export interface Idd {
  root: string
  suffixes: string[]
}

export interface Languages {
  nld?: string
  pap?: string
  prs?: string
  pus?: string
  tuk?: string
  por?: string
  eng?: string
  swe?: string
  sqi?: string
  cat?: string
  ara?: string
  grn?: string
  spa?: string
  hye?: string
  smo?: string
  fra?: string
  bar?: string
  aze?: string
  rus?: string
  run?: string
  deu?: string
  ben?: string
  bul?: string
  bos?: string
  hrv?: string
  srp?: string
  bel?: string
  bjz?: string
  aym?: string
  que?: string
  msa?: string
  dzo?: string
  nor?: string
  tsn?: string
  sag?: string
  gsw?: string
  ita?: string
  roh?: string
  zho?: string
  kon?: string
  lin?: string
  lua?: string
  swa?: string
  rar?: string
  zdj?: string
  ell?: string
  tur?: string
  ces?: string
  slk?: string
  dan?: string
  tir?: string
  ber?: string
  mey?: string
  est?: string
  amh?: string
  fin?: string
  fij?: string
  hif?: string
  fao?: string
  kat?: string
  nfr?: string
  pov?: string
  kal?: string
  cha?: string
  hat?: string
  hun?: string
  ind?: string
  glv?: string
  hin?: string
  tam?: string
  gle?: string
  fas?: string
  arc?: string
  ckb?: string
  isl?: string
  heb?: string
  jam?: string
  nrf?: string
  jpn?: string
  kaz?: string
  kir?: string
  khm?: string
  gil?: string
  kor?: string
  lao?: string
  sin?: string
  sot?: string
  lit?: string
  ltz?: string
  lav?: string
  ron?: string
  mlg?: string
  div?: string
  mah?: string
  mkd?: string
  mlt?: string
  mya?: string
  cnr?: string
  mon?: string
  cal?: string
  mfe?: string
  nya?: string
  afr?: string
  her?: string
  hgm?: string
  kwn?: string
  loz?: string
  ndo?: string
  pih?: string
  niu?: string
  nno?: string
  nob?: string
  smi?: string
  nep?: string
  nau?: string
  mri?: string
  nzs?: string
  urd?: string
  fil?: string
  pau?: string
  hmo?: string
  tpi?: string
  pol?: string
  kin?: string
  som?: string
  slv?: string
  ssw?: string
  crs?: string
  tha?: string
  tgk?: string
  tkl?: string
  tet?: string
  ton?: string
  tvl?: string
  ukr?: string
  uzb?: string
  lat?: string
  vie?: string
  bis?: string
  nbl?: string
  nso?: string
  tso?: string
  ven?: string
  xho?: string
  zul?: string
  bwg?: string
  kck?: string
  khi?: string
  ndc?: string
  nde?: string
  sna?: string
  toi?: string
  zib?: string
}

export interface Translations {
  ces: Ces2
  deu: Deu2
  est: Est2
  fin: Fin2
  fra: Fra2
  hrv: Hrv2
  hun: Hun2
  ita: Ita2
  jpn: Jpn2
  kor: Kor2
  nld: Nld2
  per: Per
  pol: Pol2
  por: Por2
  rus: Rus2
  slk: Slk2
  spa: Spa2
  swe: Swe2
  urd: Urd2
  zho: Zho2
}

export interface Ces2 {
  official: string
  common: string
}

export interface Deu2 {
  official: string
  common: string
}

export interface Est2 {
  official: string
  common: string
}

export interface Fin2 {
  official: string
  common: string
}

export interface Fra2 {
  official: string
  common: string
}

export interface Hrv2 {
  official: string
  common: string
}

export interface Hun2 {
  official: string
  common: string
}

export interface Ita2 {
  official: string
  common: string
}

export interface Jpn2 {
  official: string
  common: string
}

export interface Kor2 {
  official: string
  common: string
}

export interface Nld2 {
  official: string
  common: string
}

export interface Per {
  official: string
  common: string
}

export interface Pol2 {
  official: string
  common: string
}

export interface Por2 {
  official: string
  common: string
}

export interface Rus2 {
  official: string
  common: string
}

export interface Slk2 {
  official: string
  common: string
}

export interface Spa2 {
  official: string
  common: string
}

export interface Swe2 {
  official: string
  common: string
}

export interface Urd2 {
  official: string
  common: string
}

export interface Zho2 {
  official: string
  common: string
}

export interface Demonyms {
  eng: Eng2
  fra: Fra3
}

export interface Eng2 {
  f: string
  m: string
}

export interface Fra3 {
  f: string
  m: string
}
