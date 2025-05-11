import React, { useState } from "react";
import LessonAccordion from "./components/LessonAccordion";
import { useEffect } from "react";
import { getLessonProgress, setLessonProgress } from "./firebase/config";

// Örnek veri
function addIdsToSubjects(data) {
  const newData = {};
  Object.entries(data).forEach(([exam, lessons]) => {
    newData[exam] = lessons.map((lesson, lessonIdx) => ({
      ...lesson,
      subjects: lesson.subjects.map((subject, subjIdx) => ({
        ...subject,
        id: `${exam.toLowerCase()}-${lesson.lesson.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${subjIdx + 1}`,
      })),
    }));
  });
  return newData;
}

const initialData = addIdsToSubjects({
  TYT: [
    {
      lesson: "Türkçe",
      subjects: [
        { name: "Sözcükte Anlam", status: "bitmedi", comment: "" },
        { name: "Söz Yorumu", status: "bitmedi", comment: "" },
        { name: "Deyim ve Atasözü", status: "bitmedi", comment: "" },
        { name: "Cümlede Anlam", status: "bitmedi", comment: "" },
        { name: "Paragraf", status: "bitmedi", comment: "" },
        { name: "Paragrafta Anlatım Teknikleri", status: "bitmedi", comment: "" },
        { name: "Paragrafta Düşünceyi Geliştirme Yolları", status: "bitmedi", comment: "" },
        { name: "Paragrafta Yapı", status: "bitmedi", comment: "" },
        { name: "Paragrafta Konu-Ana Düşünce", status: "bitmedi", comment: "" },
        { name: "Paragrafta Yardımcı Düşünce", status: "bitmedi", comment: "" },
        { name: "Ses Bilgisi", status: "bitmedi", comment: "" },
        { name: "Yazım Kuralları", status: "bitmedi", comment: "" },
        { name: "Noktalama İşaretleri", status: "bitmedi", comment: "" },
        { name: "Sözcükte Yapı/Ekler", status: "bitmedi", comment: "" },
        { name: "Sözcük Türleri", status: "bitmedi", comment: "" },
        { name: "İsimler", status: "bitmedi", comment: "" },
        { name: "Zamirler", status: "bitmedi", comment: "" },
        { name: "Sıfatlar", status: "bitmedi", comment: "" },
        { name: "Zarflar", status: "bitmedi", comment: "" },
        { name: "Edat – Bağlaç – Ünlem", status: "bitmedi", comment: "" },
        { name: "Fiiller", status: "bitmedi", comment: "" },
        { name: "Fiilde Anlam (Kip-Kişi-Yapı)", status: "bitmedi", comment: "" },
        { name: "Ek Fiil", status: "bitmedi", comment: "" },
        { name: "Fiilimsi", status: "bitmedi", comment: "" },
        { name: "Fiilde Çatı", status: "bitmedi", comment: "" },
        { name: "Sözcük Grupları", status: "bitmedi", comment: "" },
        { name: "Cümlenin Ögeleri", status: "bitmedi", comment: "" },
        { name: "Cümle Türleri", status: "bitmedi", comment: "" },
        { name: "Anlatım Bozukluğu", status: "bitmedi", comment: "" },
      ],
    },
    {
      lesson: "Matematik",
      subjects: [
        { name: "Temel Kavramlar", status: "bitmedi", comment: "" },
        { name: "Sayı Basamakları", status: "bitmedi", comment: "" },
        { name: "Bölme ve Bölünebilme", status: "bitmedi", comment: "" },
        { name: "EBOB – EKOK", status: "bitmedi", comment: "" },
        { name: "Rasyonel Sayılar", status: "bitmedi", comment: "" },
        { name: "Basit Eşitsizlikler", status: "bitmedi", comment: "" },
        { name: "Mutlak Değer", status: "bitmedi", comment: "" },
        { name: "Üslü Sayılar", status: "bitmedi", comment: "" },
        { name: "Köklü Sayılar", status: "bitmedi", comment: "" },
        { name: "Çarpanlara Ayırma", status: "bitmedi", comment: "" },
        { name: "Oran Orantı", status: "bitmedi", comment: "" },
        { name: "Denklem Çözme", status: "bitmedi", comment: "" },
        { name: "Problemler-Sayı Problemleri", status: "bitmedi", comment: "" },
        { name: "Problemler-Kesir Problemleri", status: "bitmedi", comment: "" },
        { name: "Problemler-Yaş Problemleri", status: "bitmedi", comment: "" },
        { name: "Problemler-Hareket Hız Problemleri", status: "bitmedi", comment: "" },
        { name: "Problemler-İşçi Emek Problemleri", status: "bitmedi", comment: "" },
        { name: "Problemler-Yüzde Problemleri", status: "bitmedi", comment: "" },
        { name: "Problemler-Kar Zarar Problemleri", status: "bitmedi", comment: "" },
        { name: "Problemler-Karışım Problemleri", status: "bitmedi", comment: "" },
        { name: "Problemler-Grafik Problemleri", status: "bitmedi", comment: "" },
        { name: "Problemler-Rutin Olmayan Problemleri", status: "bitmedi", comment: "" },
        { name: "Kümeler – Kartezyen Çarpım", status: "bitmedi", comment: "" },
        { name: "Mantık", status: "bitmedi", comment: "" },
        { name: "Fonskiyonlar", status: "bitmedi", comment: "" },
        { name: "Polinomlar", status: "bitmedi", comment: "" },
        { name: "2.Dereceden Denklemler", status: "bitmedi", comment: "" },
        { name: "Permütasyon ve Kombinasyon", status: "bitmedi", comment: "" },
        { name: "Olasılık", status: "bitmedi", comment: "" },
        { name: "Veri – İstatistik", status: "bitmedi", comment: "" },
      ],
    },
    {
      lesson: "Geometri",
      subjects: [
        { name: "Temel Kavramlar", status: "bitmedi", comment: "" },
        { name: "Doğruda Açılar", status: "bitmedi", comment: "" },
        { name: "Üçgende Açılar", status: "bitmedi", comment: "" },
        { name: "Özel Üçgenler-Dik Üçgen", status: "bitmedi", comment: "" },
        { name: "Özel Üçgenler-İkizkenar Üçgen", status: "bitmedi", comment: "" },
        { name: "Özel Üçgenler-Eşkenar Üçgen", status: "bitmedi", comment: "" },
        { name: "Açıortay", status: "bitmedi", comment: "" },
        { name: "Kenarortay", status: "bitmedi", comment: "" },
        { name: "Eşlik ve Benzerlik", status: "bitmedi", comment: "" },
        { name: "Üçgende Alan", status: "bitmedi", comment: "" },
        { name: "Üçgende Benzerlik", status: "bitmedi", comment: "" },
        { name: "Açı Kenar Bağıntıları", status: "bitmedi", comment: "" },
        { name: "Çokgenler", status: "bitmedi", comment: "" },
        { name: "Özel Dörtgenler-Dörtgenler", status: "bitmedi", comment: "" },
        { name: "Özel Dörtgenler-Deltoid", status: "bitmedi", comment: "" },
        { name: "Özel Dörtgenler-Paralelkenar", status: "bitmedi", comment: "" },
        { name: "Özel Dörtgenler-Eşkenar Dörtgen", status: "bitmedi", comment: "" },
        { name: "Özel Dörtgenler-Dikdörtgen", status: "bitmedi", comment: "" },
        { name: "Özel Dörtgenler-Kare", status: "bitmedi", comment: "" },
        { name: "Özel Dörtgenler-Yamuk", status: "bitmedi", comment: "" },
        { name: "Çember ve Daire-Çemberde Açı", status: "bitmedi", comment: "" },
        { name: "Çember ve Daire-Çemberde Uzun", status: "bitmedi", comment: "" },
        { name: "Çember ve Daire-Dairede Çevre ve Alan", status: "bitmedi", comment: "" },
        { name: "Analitik Geometri-Noktanın Analitiği", status: "bitmedi", comment: "" },
        { name: "Analitik Geometri-Doğrunun Analitiği", status: "bitmedi", comment: "" },
        { name: "Analitik Geometri-Dönüşüm Geometrisi", status: "bitmedi", comment: "" },
        { name: "Analitik Geometri-Analitik Geometri", status: "bitmedi", comment: "" },
        { name: "Katı Cisimler-Prizmalar", status: "bitmedi", comment: "" },
        { name: "Katı Cisimler-Küp", status: "bitmedi", comment: "" },
        { name: "Katı Cisimler-Silindir", status: "bitmedi", comment: "" },
        { name: "Katı Cisimler-Piramit", status: "bitmedi", comment: "" },
        { name: "Katı Cisimler-Koni", status: "bitmedi", comment: "" },
        { name: "Katı Cisimler-Küre", status: "bitmedi", comment: "" },
        { name: "Çemberin Analitiği", status: "bitmedi", comment: "" },
      ],
    },
    {
      lesson: "Fizik",
      subjects: [
        { name: "Fizik Bilimine Giriş", status: "bitmedi", comment: "" },
        { name: "Madde ve Özellikleri", status: "bitmedi", comment: "" },
        { name: "Sıvıların Kaldırma Kuvveti", status: "bitmedi", comment: "" },
        { name: "Basınç", status: "bitmedi", comment: "" },
        { name: "Isı, Sıcaklık ve Genleşme", status: "bitmedi", comment: "" },
        { name: "Hareket ve Kuvvet", status: "bitmedi", comment: "" },
        { name: "Dinamik", status: "bitmedi", comment: "" },
        { name: "İş, Güç ve Enerji", status: "bitmedi", comment: "" },
        { name: "Elektrik", status: "bitmedi", comment: "" },
        { name: "Manyetizma", status: "bitmedi", comment: "" },
        { name: "Dalgalar", status: "bitmedi", comment: "" },
        { name: "Optik", status: "bitmedi", comment: "" },
      ],
    },
    {
      lesson: "Kimya",
      subjects: [
        { name: "KİMYASAL TÜRLER ARASI ETKİLEŞİMLER", status: "bitmedi", comment: "" },
        { name: "ATOM VE PERİYODİK SİSTEM", status: "bitmedi", comment: "" },
        { name: "KİMYA BİLİMİ", status: "bitmedi", comment: "" },
        { name: "MADDENİN HÂLLERİ", status: "bitmedi", comment: "" },
        { name: "DOĞA VE KİMYA", status: "bitmedi", comment: "" },
        { name: "KİMYANIN TEMEL KANUNLARI VE KİMYASAL HESAPLAMALAR", status: "bitmedi", comment: "" },
        { name: "KARIŞIMLAR", status: "bitmedi", comment: "" },
        { name: "ASİTLER, BAZLAR VE TUZLAR", status: "bitmedi", comment: "" },
        { name: "KİMYA HER YERDE", status: "bitmedi", comment: "" },
        { name: "KİMYASAL TEPKİMELERDE ENERJİ", status: "bitmedi", comment: "" },
        { name: "KİMYASAL TEPKİMELERDE HIZ", status: "bitmedi", comment: "" },
        { name: "KİMYASAL TEPKİMELERDE DENGE", status: "bitmedi", comment: "" },
        { name: "MODERN ATOM TEORİSİ", status: "bitmedi", comment: "" },
        { name: "GAZLAR", status: "bitmedi", comment: "" },
        { name: "SIVI ÇÖZELTİLER VE ÇÖZÜNÜRLÜK", status: "bitmedi", comment: "" },
        { name: "KARBON KİMYASINA GİRİŞ", status: "bitmedi", comment: "" },
        { name: "ORGANİK BİLEŞİKLER", status: "bitmedi", comment: "" },
        { name: "KİMYA VE ELEKTRİK", status: "bitmedi", comment: "" },
        { name: "ENERJİ KAYNAKLARI VE BİLİMSEL GELİŞMELER", status: "bitmedi", comment: "" },
      ],
    },
    {
      lesson: "Biyoloji",
      subjects: [
        { name: "Canlıların Ortak Özellikleri", status: "bitmedi", comment: "" },
        { name: "Canlıların Temel Bileşenleri", status: "bitmedi", comment: "" },
        { name: "Hücre ve Organeller – Madde Geçişleri", status: "bitmedi", comment: "" },
        { name: "Canlıların Sınıflandırılması", status: "bitmedi", comment: "" },
        { name: "Hücrede Bölünme – Üreme", status: "bitmedi", comment: "" },
        { name: "Kalıtım", status: "bitmedi", comment: "" },
        { name: "Bitki Biyolojisi", status: "bitmedi", comment: "" },
        { name: "Ekosistem", status: "bitmedi", comment: "" },
      ],
    },
    {
      lesson: "Tarih",
      subjects: [
        { name: "Tarih ve Zaman", status: "bitmedi", comment: "" },
        { name: "İnsanlığın İlk Dönemleri", status: "bitmedi", comment: "" },
        { name: "Ortaçağ'da Dünya", status: "bitmedi", comment: "" },
        { name: "İlk ve Orta Çağlarda Türk Dünyası", status: "bitmedi", comment: "" },
        { name: "İslam Medeniyetinin Doğuşu", status: "bitmedi", comment: "" },
        { name: "İlk Türk İslam Devletleri", status: "bitmedi", comment: "" },
        { name: "Yerleşme ve Devletleşme Sürecinde Selçuklu Türkiyesi", status: "bitmedi", comment: "" },
        { name: "Beylikten Devlete Osmanlı Siyaseti(1300-1453)", status: "bitmedi", comment: "" },
        { name: "Dünya Gücü Osmanlı Devleti (1453-1600)", status: "bitmedi", comment: "" },
        { name: "Yeni Çağ Avrupa Tarihi", status: "bitmedi", comment: "" },
        { name: "Yakın Çağ Avrupa Tarihi", status: "bitmedi", comment: "" },
        { name: "Osmanlı Devletinde Arayış Yılları", status: "bitmedi", comment: "" },
        { name: "18. Yüzyılda Değişim ve Diplomasi", status: "bitmedi", comment: "" },
        { name: "En Uzun Yüzyıl", status: "bitmedi", comment: "" },
        { name: "Osmanlı Kültür ve Medeniyeti", status: "bitmedi", comment: "" },
        { name: "20. Yüzyılda Osmanlı Devleti", status: "bitmedi", comment: "" },
        { name: "I. Dünya Savaşı", status: "bitmedi", comment: "" },
        { name: "Mondros Ateşkesi, İşgaller ve Cemiyetler", status: "bitmedi", comment: "" },
        { name: "Kurtuluş Savaşına Hazırlık Dönemi", status: "bitmedi", comment: "" },
        { name: "I. TBMM Dönemi", status: "bitmedi", comment: "" },
        { name: "Kurtuluş Savaşı ve Antlaşmalar", status: "bitmedi", comment: "" },
        { name: "II. TBMM Dönemi ve Çok Partili Hayata Geçiş", status: "bitmedi", comment: "" },
        { name: "Türk İnkılabı", status: "bitmedi", comment: "" },
        { name: "Atatürk İlkeleri", status: "bitmedi", comment: "" },
        { name: "Atatürk Dönemi Türk Dış Politikası", status: "bitmedi", comment: "" },
      ],
    },
    {
      lesson: "Coğrafya",
      subjects: [
        { name: "Doğa ve İnsan", status: "bitmedi", comment: "" },
        { name: "Dünya'nın Şekli ve Hareketleri", status: "bitmedi", comment: "" },
        { name: "Coğrafi Konum", status: "bitmedi", comment: "" },
        { name: "Harita Bilgisi", status: "bitmedi", comment: "" },
        { name: "Atmosfer ve Sıcaklık", status: "bitmedi", comment: "" },
        { name: "İklimler", status: "bitmedi", comment: "" },
        { name: "Basınç ve Rüzgarlar", status: "bitmedi", comment: "" },
        { name: "Nem, Yağış ve Buharlaşma", status: "bitmedi", comment: "" },
        { name: "İç Kuvvetler / Dış Kuvvetler", status: "bitmedi", comment: "" },
        { name: "Su – Toprak ve Bitkiler", status: "bitmedi", comment: "" },
        { name: "Nüfus", status: "bitmedi", comment: "" },
        { name: "Göç", status: "bitmedi", comment: "" },
        { name: "Yerleşme", status: "bitmedi", comment: "" },
        { name: "Türkiye'nin Yer Şekilleri", status: "bitmedi", comment: "" },
        { name: "Ekonomik Faaliyetler", status: "bitmedi", comment: "" },
        { name: "Bölgeler", status: "bitmedi", comment: "" },
        { name: "Uluslararası Ulaşım Hatları", status: "bitmedi", comment: "" },
        { name: "Çevre ve Toplum", status: "bitmedi", comment: "" },
        { name: "Doğal Afetler", status: "bitmedi", comment: "" },
      ],
    },
    {
      lesson: "Felsefe",
      subjects: [
        { name: "Felsefenin Konusu", status: "bitmedi", comment: "" },
        { name: "Bilgi Felsefesi", status: "bitmedi", comment: "" },
        { name: "Varlık Felsefesi", status: "bitmedi", comment: "" },
        { name: "Din, Kültür ve Medniyet", status: "bitmedi", comment: "" },
        { name: "Ahlak Felsefesi", status: "bitmedi", comment: "" },
        { name: "Sanat Felsefesi", status: "bitmedi", comment: "" },
        { name: "Din Felsefesi", status: "bitmedi", comment: "" },
        { name: "Siyaset Felsefesi", status: "bitmedi", comment: "" },
        { name: "Bilim Felsefesi", status: "bitmedi", comment: "" },
      ],
    },
    {
      lesson: "Din",
      subjects: [
        { name: "İnanç", status: "bitmedi", comment: "" },
        { name: "İbadet", status: "bitmedi", comment: "" },
        { name: "Ahlak ve Değerler", status: "bitmedi", comment: "" },
        { name: "Din, Kültür ve Medniyet", status: "bitmedi", comment: "" },
        { name: "Hz. Mhammed (S.A.V.)", status: "bitmedi", comment: "" },
        { name: "Vahiy ve Akıl", status: "bitmedi", comment: "" },
        { name: "Dünya ve Ahiret", status: "bitmedi", comment: "" },
        { name: "Kur'an'a göre Hz. Muhammed (S.A.V.)", status: "bitmedi", comment: "" },
        { name: "İnançla İlgili Meseleler", status: "bitmedi", comment: "" },
        { name: "Yahudilik ve Hristiyanlık", status: "bitmedi", comment: "" },
        { name: "İslam ve Bilim", status: "bitmedi", comment: "" },
        { name: "Anadolu da İslam", status: "bitmedi", comment: "" },
        { name: "İslam Düşüncesinde Tasavvufi Yorumlar", status: "bitmedi", comment: "" },
        { name: "Güncel Dini Meseler", status: "bitmedi", comment: "" },
        { name: "Hint ve Çin Dinleri", status: "bitmedi", comment: "" },
      ],
    },
  ],
  AYT: [
    {
      lesson: "Matematik",
      subjects: [
        { name: "Temel Kavramlar", status: "bitmedi", comment: "" },
        { name: "Sayı Basamakları", status: "bitmedi", comment: "" },
        { name: "Bölme ve Bölünebilme", status: "bitmedi", comment: "" },
        { name: "EBOB - EKOK", status: "bitmedi", comment: "" },
        { name: "Rasyonel Sayılar", status: "bitmedi", comment: "" },
        { name: "Basit Eşitsizlikler", status: "bitmedi", comment: "" },
        { name: "Mutlak Değer", status: "bitmedi", comment: "" },
        { name: "Üslü Sayılar", status: "bitmedi", comment: "" },
        { name: "Köklü Sayılar", status: "bitmedi", comment: "" },
        { name: "Çarpanlara Ayırma", status: "bitmedi", comment: "" },
        { name: "Oran Orantı", status: "bitmedi", comment: "" },
        { name: "Denklem Çözme", status: "bitmedi", comment: "" },
        { name: "Problemler", status: "bitmedi", comment: "" },
        { name: "Kümeler", status: "bitmedi", comment: "" },
        { name: "Kartezyen Çarpım", status: "bitmedi", comment: "" },
        { name: "Mantık", status: "bitmedi", comment: "" },
        { name: "Fonskiyonlar", status: "bitmedi", comment: "" },
        { name: "Polinomlar", status: "bitmedi", comment: "" },
        { name: "2.Dereceden Denklemler", status: "bitmedi", comment: "" },
        { name: "Permütasyon ve Kombinasyon", status: "bitmedi", comment: "" },
        { name: "Binom ve Olasılık", status: "bitmedi", comment: "" },
        { name: "İstatistik", status: "bitmedi", comment: "" },
        { name: "Karmaşık Sayılar", status: "bitmedi", comment: "" },
        { name: "2.Dereceden Eşitsizlikler", status: "bitmedi", comment: "" },
        { name: "Parabol", status: "bitmedi", comment: "" },
        { name: "Trigonometri", status: "bitmedi", comment: "" },
        { name: "Logaritma", status: "bitmedi", comment: "" },
        { name: "Diziler", status: "bitmedi", comment: "" },
        { name: "Limit", status: "bitmedi", comment: "" },
        { name: "Türev", status: "bitmedi", comment: "" },
        { name: "İntegral", status: "bitmedi", comment: "" },
      ],
    },
    {
      lesson: "Geometri",
      subjects: [
        { name: "Temel Kavramlar", status: "bitmedi", comment: "" },
        { name: "Doğruda Açılar", status: "bitmedi", comment: "" },
        { name: "Üçgende Açılar", status: "bitmedi", comment: "" },
        { name: "Özel Üçgenler-Dik Üçgen", status: "bitmedi", comment: "" },
        { name: "Özel Üçgenler-İkizkenar Üçgen", status: "bitmedi", comment: "" },
        { name: "Özel Üçgenler-Eşkenar Üçgen", status: "bitmedi", comment: "" },
        { name: "Açıortay", status: "bitmedi", comment: "" },
        { name: "Kenarortay", status: "bitmedi", comment: "" },
        { name: "Üçgende Alan", status: "bitmedi", comment: "" },
        { name: "Üçgende Benzerlik", status: "bitmedi", comment: "" },
        { name: "Açı Kenar Bağıntıları", status: "bitmedi", comment: "" },
        { name: "Çokgenler", status: "bitmedi", comment: "" },
        { name: "Özel Dörtgenler", status: "bitmedi", comment: "" },
        { name: "Dörtgenler-Deltoid", status: "bitmedi", comment: "" },
        { name: "Dörtgenler-Paralelkenar", status: "bitmedi", comment: "" },
        { name: "Dörtgenler-Eşkenar Dörtgen", status: "bitmedi", comment: "" },
        { name: "Dörtgenler-Dikdörtgen", status: "bitmedi", comment: "" },
        { name: "Dörtgenler-Kare", status: "bitmedi", comment: "" },
        { name: "Dörtgenler-İkizkenar", status: "bitmedi", comment: "" },
        { name: "Dörtgenler-Yamuk", status: "bitmedi", comment: "" },
        { name: "Çember ve Daire", status: "bitmedi", comment: "" },
        { name: "Analitik Geometri-Noktanın Analitiği", status: "bitmedi", comment: "" },
        { name: "Analitik Geometri-Doğrunun Analitiği", status: "bitmedi", comment: "" },
        { name: "Analitik Geometri-Dönüşüm Geometrisi", status: "bitmedi", comment: "" },
        { name: "Katı Cisimler (Uzay Geometri)-Dikdörtgenler Prizması", status: "bitmedi", comment: "" },
        { name: "Katı Cisimler (Uzay Geometri)-Küp", status: "bitmedi", comment: "" },
        { name: "Katı Cisimler (Uzay Geometri)-Silindir", status: "bitmedi", comment: "" },
        { name: "Katı Cisimler (Uzay Geometri)-Piramit", status: "bitmedi", comment: "" },
        { name: "Katı Cisimler (Uzay Geometri)-Koni", status: "bitmedi", comment: "" },
        { name: "Katı Cisimler (Uzay Geometri)-Küre", status: "bitmedi", comment: "" },
        { name: "Çemberin Analitiği", status: "bitmedi", comment: "" },
      ],
    },
    {
      lesson: "Fizik",
      subjects: [
        { name: "Vektörler", status: "bitmedi", comment: "" },
        { name: "Kuvvet, Tork ve Denge", status: "bitmedi", comment: "" },
        { name: "Kütle Merkezi", status: "bitmedi", comment: "" },
        { name: "Basit Makineler", status: "bitmedi", comment: "" },
        { name: "Hareket", status: "bitmedi", comment: "" },
        { name: "Newton'un Hareket Yasaları", status: "bitmedi", comment: "" },
        { name: "İş, Güç ve Enerji II", status: "bitmedi", comment: "" },
        { name: "Atışlar", status: "bitmedi", comment: "" },
        { name: "İtme ve Momentum", status: "bitmedi", comment: "" },
        { name: "Elektrik Alan ve Potansiyel", status: "bitmedi", comment: "" },
        { name: "Paralel Levhalar ve Sığa", status: "bitmedi", comment: "" },
        { name: "Manyetik Alan ve Manyetik Kuvvet", status: "bitmedi", comment: "" },
        { name: "İndüksiyon, Alternatif Akım ve Transformatörler", status: "bitmedi", comment: "" },
        { name: "Çembersel Hareket", status: "bitmedi", comment: "" },
        { name: "Dönme, Yuvarlanma ve Açısal Momentum", status: "bitmedi", comment: "" },
        { name: "Kütle Çekim ve Kepler Yasaları", status: "bitmedi", comment: "" },
        { name: "Basit Harmonik Hareket", status: "bitmedi", comment: "" },
        { name: "Dalga Mekaniği ve Elektromanyetik Dalgalar", status: "bitmedi", comment: "" },
        { name: "Atom Modelleri", status: "bitmedi", comment: "" },
        { name: "Büyük Patlama ve Parçacık Fiziği", status: "bitmedi", comment: "" },
        { name: "Radyoaktivite", status: "bitmedi", comment: "" },
        { name: "Özel Görelilik", status: "bitmedi", comment: "" },
        { name: "Kara Cisim Işıması", status: "bitmedi", comment: "" },
        { name: "Fotoelektrik Olay ve Compton Olayı", status: "bitmedi", comment: "" },
        { name: "Modern Fiziğin Teknolojideki Uygulamaları", status: "bitmedi", comment: "" },
      ],
    },
    {
      lesson: "Kimya",
      subjects: [
        { name: "Kimya Bilimi", status: "bitmedi", comment: "" },
        { name: "Atom ve Periyodik Sistem", status: "bitmedi", comment: "" },
        { name: "Kimyasal Türler Arası Etkileşimler", status: "bitmedi", comment: "" },
        { name: "Kimyasal Hesaplamalar", status: "bitmedi", comment: "" },
        { name: "Kimyanın Temel Kanunları", status: "bitmedi", comment: "" },
        { name: "Asit, Baz ve Tuz", status: "bitmedi", comment: "" },
        { name: "Maddenin Halleri", status: "bitmedi", comment: "" },
        { name: "Karışımlar", status: "bitmedi", comment: "" },
        { name: "Doğa ve Kimya", status: "bitmedi", comment: "" },
        { name: "Kimya Her Yerde", status: "bitmedi", comment: "" },
        { name: "Modern Atom Teorisi", status: "bitmedi", comment: "" },
        { name: "Gazlar", status: "bitmedi", comment: "" },
        { name: "Sıvı Çözeltiler", status: "bitmedi", comment: "" },
        { name: "Kimyasal Tepkimelerde Enerji", status: "bitmedi", comment: "" },
        { name: "Kimyasal Tepkimelerde Hız", status: "bitmedi", comment: "" },
        { name: "Kimyasal Tepkimelerde Denge", status: "bitmedi", comment: "" },
        { name: "Asit-Baz Dengesi", status: "bitmedi", comment: "" },
        { name: "Çözünürlük Dengesi", status: "bitmedi", comment: "" },
        { name: "Kimya ve Elektrik", status: "bitmedi", comment: "" },
        { name: "Organik Kimyaya Giriş", status: "bitmedi", comment: "" },
        { name: "Organik Kimya", status: "bitmedi", comment: "" },
        { name: "Enerji Kaynakları ve Bilimsel Gelişmeler", status: "bitmedi", comment: "" },
      ],
    },
    {
      lesson: "Biyoloji",
      subjects: [
        { name: "Sinir Sistemi", status: "bitmedi", comment: "" },
        { name: "Endokrin Sistem ve Hormonlar", status: "bitmedi", comment: "" },
        { name: "Duyu Organları", status: "bitmedi", comment: "" },
        { name: "Destek ve Hareket Sistemi", status: "bitmedi", comment: "" },
        { name: "Sindirim Sistemi", status: "bitmedi", comment: "" },
        { name: "Dolaşım ve Bağışıklık Sistemi", status: "bitmedi", comment: "" },
        { name: "Solunum Sistemi", status: "bitmedi", comment: "" },
        { name: "Üriner Sistem (Boşaltım Sistemi)", status: "bitmedi", comment: "" },
        { name: "Üreme Sistemi ve Embriyonik Gelişim", status: "bitmedi", comment: "" },
        { name: "Komünite Ekolojisi", status: "bitmedi", comment: "" },
        { name: "Popülasyon Ekolojisi", status: "bitmedi", comment: "" },
        { name: "Genden Proteine-Nükleik Asitler", status: "bitmedi", comment: "" },
        { name: "Genden Proteine-Genetik Şifre ve Protein Sentezi", status: "bitmedi", comment: "" },
        { name: "Canlılarda Enerji Dönüşümleri-Canlılık ve Enerji", status: "bitmedi", comment: "" },
        { name: "Canlılarda Enerji Dönüşümleri-Fotosentez", status: "bitmedi", comment: "" },
        { name: "Canlılarda Enerji Dönüşümleri-Kemosentez", status: "bitmedi", comment: "" },
        { name: "Canlılarda Enerji Dönüşümleri-Hücresel Solunum", status: "bitmedi", comment: "" },
        { name: "Bitki Biyolojisi", status: "bitmedi", comment: "" },
        { name: "Canlılar ve Çevre", status: "bitmedi", comment: "" },
      ],
    },
  ],
});

const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

function App() {
  const [activeTab, setActiveTab] = useState("TYT");
  const [data, setData] = useState(initialData);
  const [openAccordions, setOpenAccordions] = useState({ TYT: {}, AYT: {} });
  const [loading, setLoading] = useState(true);

  // Uygulama açıldığında Firestore'dan tüm dersleri paralel olarak yükle
  useEffect(() => {
    const fetchAllLessons = async () => {
      setLoading(true);
      const newData = { TYT: [], AYT: [] };
      for (const exam of ["TYT", "AYT"]) {
        for (const lesson of initialData[exam]) {
          const subjects = await getLessonProgress(exam, lesson.lesson);
          newData[exam].push({
            ...lesson,
            subjects: subjects || lesson.subjects,
          });
        }
      }
      setData(newData);
      setLoading(false);
    };
    fetchAllLessons();
  }, []);

  // Accordion açma/kapama
  const handleAccordionToggle = (lessonName) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [lessonName]: !prev[activeTab][lessonName],
      },
    }));
  };

  // Sadece ilgili dersi güncelle ve kaydet
  const handleSubjectSave = (lessonName, subjectId, newStatus, newComment, changedField) => {
    setData((prev) => {
      const newData = deepCopy(prev);
      newData[activeTab] = newData[activeTab].map((lesson) => {
        if (lesson.lesson !== lessonName) return lesson;
        const updatedLesson = {
          ...lesson,
          subjects: lesson.subjects.map((subject) => {
            if (subject.id !== subjectId) return subject;
            if (changedField === "status") {
              return { ...subject, status: newStatus };
            } else if (changedField === "comment") {
              return { ...subject, comment: newComment };
            }
            return subject;
          }),
        };
        // Firestore'a sadece bu dersi yaz (arka planda, await yok)
        setLessonProgress(activeTab, lessonName, updatedLesson.subjects);
        return updatedLesson;
      });
      return newData;
    });
  };

  return (
    <div style={{ maxWidth: 1700, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>TYT & AYT Konu Takip</h1>
      {loading ? (
        <div style={{ textAlign: "center", margin: 40, fontSize: 22 }}>Yükleniyor...</div>
      ) : (
        <>
          <div style={{
            marginBottom: 12,
            padding: "8px 0",
            background: "#e3f2fd",
            borderRadius: 8,
            textAlign: "center",
            fontWeight: "bold",
            color: "#1976d2",
            fontSize: 18,
          }}>
            Genel İlerleme: {data[activeTab].flatMap((lesson) => lesson.subjects).filter((s) => s.status === "bitti").length}/{data[activeTab].flatMap((lesson) => lesson.subjects).length} (%{data[activeTab].flatMap((lesson) => lesson.subjects).length > 0 ? Math.round(data[activeTab].flatMap((lesson) => lesson.subjects).filter((s) => s.status === "bitti").length / data[activeTab].flatMap((lesson) => lesson.subjects).length * 100) : 0})
          </div>
          <div style={{ display: "flex", marginBottom: 24 }}>
            <button
              onClick={() => setActiveTab("TYT")}
              style={{
                flex: 1,
                padding: 12,
                background: activeTab === "TYT" ? "#1976d2" : "#e0e0e0",
                color: activeTab === "TYT" ? "#fff" : "#000",
                border: "none",
                borderRadius: "8px 0 0 8px",
                cursor: "pointer",
              }}
            >
              TYT
            </button>
            <button
              onClick={() => setActiveTab("AYT")}
              style={{
                flex: 1,
                padding: 12,
                background: activeTab === "AYT" ? "#1976d2" : "#e0e0e0",
                color: activeTab === "AYT" ? "#fff" : "#000",
                border: "none",
                borderRadius: "0 8px 8px 0",
                cursor: "pointer",
              }}
            >
              AYT
            </button>
          </div>
          {data[activeTab].map((lesson) => (
            <LessonAccordion
              key={activeTab + '-' + lesson.lesson}
              lesson={lesson.lesson}
              subjects={lesson.subjects}
              onSubjectSave={handleSubjectSave}
              open={!!openAccordions[activeTab][lesson.lesson]}
              onToggle={() => handleAccordionToggle(lesson.lesson)}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default App;