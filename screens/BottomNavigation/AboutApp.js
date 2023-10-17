import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React, { useLayoutEffect } from 'react'
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { useSelector, useDispatch } from 'react-redux';

import {
    CustomFont, Colors,
    InnerContainer,
    PageTitle,
    TermsHeadings,
    TermsTextContent,
    TermsButton,
    Line,
    SubTitle,
    NormalText
} from '../../components/styles';
const { brand, darkLight, primary, tertiary, red, search, backgroundColor } = Colors;

const AboutApp = ({ navigation }) => {



    const translation = useSelector((state) => state.translation.messages);

    return (
        <KeyboardAvoidingWrapper>
            <>
                <StatusBar style="dark" />
                <InnerContainer style={{ flex: 1, paddingTop: 20, paddingBottom: 100, paddingHorizontal: 20 }}>
                    <Text style={{ fontSize: 24, textAlign: "center", padding: 10, marginBottom: 20 }}>Namena aplikacije</Text>
                    <Text style={{ fontSize: 22, marginBottom: 20, letterSpacing: 1, color: search, }}>Kako funkcioniše Avankari</Text>

                    <NormalText style={{}}>Aplikacija Avankari je isključivo društvenog karaktera, ali se može itekako iskoristiti i u poslovne svrhe kao i mnoge druge, sve je do tvoje kreativnosti.
                        {'\n'}
                    </NormalText>
                    <NormalText style={{ marginBottom: 10 }}>Cilj aplikacije je da spoji ljude,i da ti na bezbedan način omogući da možeš u svakom trenutku biti dostupan drugim ljudima ukoliko to želiš.
                    </NormalText>
                    <NormalText style={{ marginBottom: 10 }}>Kao i da u svakom trenutku možeš da postaneš nedostupan.
                    </NormalText>
                    <NormalText style={{ marginBottom: 10 }}>A možeš isto tako pronaći druge ljude koji koriste aplikaciju.
                        {'\n'}
                    </NormalText>

                    <NormalText style={{ marginBottom: 10, color: brand }}>Navešćemo ti neke od funkcionalnosti aplikacije i dati neke primere u kojima bi Avankari mogao da ti bude koristan.
                    </NormalText>
                    <Line />

                    {/* HOME */}

                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                        <Text style={{ marginLeft: 8, fontSize: 26, color: search }}>HOME </Text>
                    </View>
                    <NormalText style={{ marginBottom: 10 }}>U tabu "HOME" imas mogćnost postaviš svoju sliku kao i da postavis svoje kontakte vidljivim.
                    </NormalText>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>{'\u2022'}</Text>
                        <Text style={{ marginLeft: 8, fontSize: 16, color: search }}>Facebook {'\n'}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>{'\u2022'}</Text>
                        <Text style={{ marginLeft: 8, fontSize: 16, color: search }}>Instagram {'\n'}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>{'\u2022'}</Text>
                        <Text style={{ marginLeft: 8, fontSize: 16, color: search }}>Broj Telefona {'\n'}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>{'\u2022'}</Text>
                        <Text style={{ marginLeft: 8, fontSize: 16, color: search }}>Broj Tablice {'\n'}</Text>
                    </View>
                    <NormalText>Postavljanjem ovih podataka vidljivim, svako ko te bude tražio na osnovu nekih parametara, moći će da vidi tvoje društvene mreže ili broj telefona, i stupi sa tobom u kontakt.
                    </NormalText>
                    <NormalText>Uz Avankari, bezbednost je prioritet. Tvoji podaci su zaštićeni i samo kada ti želiš,drugi će imati pristup tvojim podacima.</NormalText>
                    <NormalText style={{ color: search, fontWeight: "bold" }}>Postavi tablicu vidljivom jer "SEARCH" tab ima mogućnost da te drugi korisnici Avankari aplikacije traže i preko tablice.
                    </NormalText>
                    <NormalText style={{ color: search }}> Ako npr voziš kombi,i nudiš usluge prevoza, ili bilo koje druge delatnosti, a nemaš reklamu, biće ti od koristi da uvek budeš dostupan preko Avankari aplikacije, neko će videti tablicu, pronaći te i kontaktirati te.</NormalText>
                    <NormalText>Da li ti se nekad desi da stojiš na semaforu i vidiš lepu devojku ili momka da prelazi ulicu.</NormalText>
                    <NormalText> Gledate se , ali se na tom pogledu sve završava.</NormalText>
                    <NormalText> Zamisli da ima mogućnost da vidi tvoju tablicu, nadje te preko Avankari aplikacije i doda te na nekoj od vec ažuriranih društvenih mreža.</NormalText>


                    <Line />

                    {/* PROFILE */}

                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                        <Text style={{ marginLeft: 8, fontSize: 26, color: search }}>PROFILE </Text>
                    </View>
                    <NormalText style={{ marginBottom: 10 }}>U tabu "PROFILE" imas mogćnost da postaviš sledeće:
                    </NormalText>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>{'\u2022'}</Text>
                        <Text style={{ marginLeft: 8, fontSize: 16, color: search }}>Grad {'\n'}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>{'\u2022'}</Text>
                        <Text style={{ marginLeft: 8, fontSize: 16, color: search }}>Mesto {'\n'}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>{'\u2022'}</Text>
                        <Text style={{ marginLeft: 8, fontSize: 16, color: search }}>Tvoj trenutni izgled{'\n'}</Text>
                    </View>
                    <NormalText style={{ marginBottom: 10 }}>Grad i Mesto su obavezna polja ukoliko želiš da budeš dostupan drugim korisnicima aplikacije. {'\n'}
                    </NormalText>
                    <NormalText style={{ marginBottom: 10 }}>Kada unosiš Grad i Mesto, unesi tačno ime Grada ili Mesta </NormalText>
                    <NormalText style={{ marginBottom: 10, color: search }}>Ako si u Zemunu , pišeš u polju Grad : Zemun </NormalText>
                    <NormalText style={{ marginBottom: 10, color: search }}>Ako si u nekom kafiću , pišeš Mesto: tačno ime kafića</NormalText>
                    <NormalText style={{ marginBottom: 10 }}>Ostali parametri su opcioni.</NormalText>
                    <NormalText style={{ marginBottom: 10 }}>Ali ako uneseš svoj trenutni izlged, olakšaćeš drugima da pronadju baš tebe.
                        {'\n'}</NormalText>

                    <NormalText style={{ marginBottom: 10, color: search }}>Na primer : </NormalText>
                    <NormalText style={{ marginBottom: 10 }}>Izlaziš u grad, Updejtuješ se. </NormalText>
                    <NormalText style={{ marginBottom: 10, fontWeight: "bold" }}>Grad: Beograd, Mesto: Stara kafana </NormalText>
                    <NormalText style={{ marginBottom: 10 }}>Svako ko koristi aplikaciju moći će preko ova dva parametra da vidi ko se sve nalazi u Beogradu u Staroj kafani.</NormalText>
                    <NormalText style={{ marginBottom: 10 }}>Ako si takodje uneo ostale parametre tipa, Boja kose, Boja očiju, šta si obukao ili obuo, olakšaćeš drugima da te lakše pronadju.</NormalText>

                    <NormalText style={{ marginBottom: 10, color: search }}>Situacija je sledeća.</NormalText>
                    <NormalText style={{ marginBottom: 10 }}>Sediš u kafiću, diskoteci, kafani, na koncertu, u bioskopu...bilo gde... vidiš devojku , ili devojka vidi tebe, situacija je neprikladna ili nemate hrabrosti da pridjete jedno drugom, tu Avankari Nastupa!</NormalText>
                    <NormalText style={{ marginBottom: 10 }}>Ti budi Updejtovan Gde se nalaziš i kako izlgedaš za to veče.</NormalText>
                    <NormalText style={{ marginBottom: 10 }}>Verovatnoća je velika da ukoliko nekoj devojci privučeš pažnju, naći će te i videće tvoje društvene mreže.</NormalText>
                    <NormalText style={{ marginBottom: 10 }}>Eto mogućnosti da se opet čujete i vidite.</NormalText>
                    <Line />

                    {/* SEARCH */}

                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                        <Text style={{ marginLeft: 8, fontSize: 26, color: search }}>LUPA </Text>
                    </View>
                    <NormalText style={{ marginBottom: 10 }}>Klikom na "LUPU" dobijaš mogćnost da ti tražiš druge korisnike aplikacije.
                    </NormalText>
                    <NormalText style={{ marginBottom: 10 }}>Postoji polje za unos tablice koje ti omogućava da pronadješ ostale korisnike Avankari Aplikacije preko tablice.</NormalText>
                    <NormalText style={{ marginBottom: 10 }}>Prelaziš ulicu, vidiš lepog momka ili devojku za volanom, probaj da ga/je pronadješ preko Avankarija.</NormalText>

                    <NormalText style={{ marginBottom: 10, color: search }}>Evo jednog primera kako pretraga radi</NormalText>
                    <NormalText style={{ marginBottom: 10 }}>Izašao si u grad , video devojku, nemaš hrabrosti da joj pridješ</NormalText>
                    <NormalText style={{ marginBottom: 10 }}>Nadji je preko Avankari aplikacije tako što ćeš klikom na lupu uneti grad i trenutno mesto tačno napisano.</NormalText>
                    <NormalText style={{ marginBottom: 10 }}>Npr u polje Grad uneseš Kraljevo, u polje mesto uneses samo ime kafane, kafića, diskoteke</NormalText>
                    <NormalText style={{ marginBottom: 10 }}>Takođe možeš preciznije pretražiti osobu, ako uneseš parametre koji se poklapaju sa njenjim trenutnim izgledom kao što je pol, boja kose,boja očiju, šta je obukla.</NormalText>


                </InnerContainer>
            </>
        </KeyboardAvoidingWrapper>
    )
}

export default AboutApp

const styles = StyleSheet.create({})