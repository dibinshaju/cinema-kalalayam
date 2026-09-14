// Cinema Kalalayam™ - AI Mentor Feedback & Roast Engine
// Generates contextual Malayalam, Manglish, and English film verdicts based on granular CV performance metrics

import { MENTORS } from '../data/mentorData.js';
import { COURSES } from '../data/courseData.js';

export class FeedbackEngine {
  static generateVerdict(scoreData, mentorId, courseId) {
    const mentor = MENTORS.find(m => m.id === mentorId) || MENTORS[0];
    const course = COURSES.find(c => c.id === courseId) || COURSES[0];
    const { overall, accuracy, timing, drama, style, mass } = scoreData;

    let tier = 'average';
    let emotionalState = 'react_average';

    if (overall < 55) {
      tier = 'poor';
      emotionalState = 'react_poor';
    } else if (overall < 80) {
      tier = 'average';
      emotionalState = 'react_average';
    } else if (overall < 95) {
      tier = 'good';
      emotionalState = 'react_good';
    } else {
      tier = 'excellent';
      emotionalState = 'react_excellent';
    }

    // Dynamic roasts and praise tailored to course & metrics
    let quote = '';
    let translation = '';
    let specificObservation = '';

    if (courseId === 'hero-walk-101') {
      if (tier === 'poor') {
        quote = '“Speed kooduthal aanu! Walking velocity kandittu KSRTC bus pidikkan odunna pole undu. Mass zero!”';
        translation = '“Walking speed is way too fast! You look like you are rushing to catch an ordinary passenger bus. Zero cinematic mass.”';
        specificObservation = `Walk speed exceeded cinematic limit. Shoulder stability registered at ${accuracy}%.`;
      } else if (tier === 'average') {
        quote = '“Nadatham okke und... pakshe purakil explosion nadakkunna feel illa. Mukham kurachu koodi serious aakku.”';
        translation = '“The walk is there, but there is no feeling of a 20-ton explosion happening behind you. Make your face 35% more indifferent.”';
        specificObservation = `Mass Index reached ${mass}%. Stride aerodynamic drag is within normal hero boundaries.`;
      } else if (tier === 'good') {
        quote = '“Ippo scene aayi! Aa mundu-madakki kuthal and slow stride was pure theatre front-row bliss!”';
        translation = '“Now this is a scene! That slow stride and swagger was absolute bliss for the cinema front rows!”';
        specificObservation = `Hero gravity calibrated at ${overall}%. Sunglasses angle maintained optimal attitude.`;
      } else {
        quote = '“ENTHOOTU MASS DA! Theatre roof potti therichu! Director is calling the producer to increase budget!”';
        translation = '“WHAT COLOSSAL MASS! The theatre roof has blown off! The director is calling the producer to double the budget!”';
        specificObservation = `PERFECT INTERVAL HERO WALK! Mass Index locked at a staggering ${mass}%.`;
      }
    } else if (courseId === 'cinematic-dance') {
      if (tier === 'poor') {
        quote = '“Ithu dance aano atho current adichathano? Shoulder kandittu athinu dance ariyilla enn thonnum.”';
        translation = '“Is this dance or an electric shock? Looking at your shoulder, it seems completely unaware of rhythm.”';
        specificObservation = `Shoulder displacement reached only ${accuracy}%. Rhythm synchrony missed the bass drop.`;
      } else if (tier === 'average') {
        quote = '“Something und... but enthaanu enn enikku ariyilla. Energy undu, pakshe synchrony poyi tholanjhu.”';
        translation = '“There is something here, but even I cannot decipher what. You have energy, but synchrony has gone missing.”';
        specificObservation = `BGM Timing achieved ${timing}%. Pelvic air displacement within allowable tolerance.`;
      } else if (tier === 'good') {
        quote = '“Step nannayittundu! Rain song background dancers are getting intimidated by your confidence!”';
        translation = '“The step turned out very well! The rain-song background dancers are visibly intimidated by you!”';
        specificObservation = `Cinematic energy surged to ${drama}%. 40 background dancers successfully imagined.`;
      } else {
        quote = '“DA! ITHU AANU MASS! State Award for Unnecessary Kinetic Energy officially granted!”';
        translation = '“MAN! THIS IS TRUE MASS! State Award for Unnecessary Kinetic Energy is officially yours!”';
        specificObservation = `Flawless kinetic execution. ${overall}% Cinematic Potential recorded.`;
      }
    } else if (courseId === 'villain-stare') {
      if (tier === 'poor') {
        quote = '“Ithu kandittu aarum pedikkilla. Hero vishramikkukayaanu. Kann chimmathe nokkan padikku!”';
        translation = '“Nobody is afraid of this look. The hero is resting peacefully. Learn to look without blinking!”';
        specificObservation = `Micro-blinks detected. Ocular malice index logged at ${accuracy}%.`;
      } else if (tier === 'average') {
        quote = '“Notam kooduthal aanu, pakshe jawlineil karunayude lesham koodi poyi. Pure spite venam!”';
        translation = '“The stare has intensity, but your jawline still shows mercy. We need pure unadulterated spite!”';
        specificObservation = `Gaze stability held at ${accuracy}%. Background violin stinger calibrated at ${drama}%.`;
      } else if (tier === 'good') {
        quote = '“Danger look! Even the camera operator is asking for a police escort home tonight.”';
        translation = '“Genuinely hazardous stare! Even the camera operator is requesting a police escort home.”';
        specificObservation = `Ocular malice scored ${overall}%. Intimidation radius reached 45 meters.`;
      } else {
        quote = '“COLD BLOODED CELLULOID TERROR! The projectionist has run out screaming! Mass index 100%!”';
        translation = '“COLD BLOODED CELLULOID TERROR! The projectionist has run out screaming! Mass index 100%!”';
        specificObservation = `Supreme villainy. Target pupil dilation reached lethal cinematic levels (${mass}% Mass).`;
      }
    } else if (courseId === 'hand-gesture-science') {
      if (tier === 'poor') {
        quote = '“Kaikal kandittu headphone wire azhikkan sramikkunna pole undu. Mudrayil threat illa!”';
        translation = '“Your hands look like someone trying to untangle headphone wires. The mudra contains zero threat!”';
        specificObservation = `Finger articulation reached ${accuracy}%. Ancestral property dispute not conveyed.`;
      } else if (tier === 'average') {
        quote = '“Viralinte angle sheriyaanu, pakshe thumb tension kuravanu. One finger speaks cinema, rest are silent.”';
        translation = '“The finger angle is correct, but thumb tension is lacking. One finger speaks cinema, the rest are mute.”';
        specificObservation = `Wrist rotational velocity measured at ${style}%. Tension slightly below standard.`;
      } else if (tier === 'good') {
        quote = '“Shakthamaya non-verbal warning! Front-row audience understood the entire family conspiracy!”';
        translation = '“Powerful non-verbal warning! The front-row audience understood the whole family conspiracy!”';
        specificObservation = `Gesture precision clocked at ${accuracy}%. Subtle threat coefficient confirmed.`;
      } else {
        quote = '“MASTERCLASS IN MEANINGLESS FINGER GEOMETRY! One flick and three dynasties have collapsed!”';
        translation = '“MASTERCLASS IN MEANINGLESS FINGER GEOMETRY! One flick and three dynasties have collapsed!”';
        specificObservation = `Kathakali-level hand articulation. Mass potential locked at ${overall}%.`;
      }
    } else {
      // Dialogue Delivery
      if (tier === 'poor') {
        quote = '“Ration card apeksha vaayikkukayaano? Soundil fire venam! Courtroom muzhanganam!”';
        translation = '“Are you reading out a ration card form? We need fire in the voice! Make the courtroom rumble!”';
        specificObservation = `Vocal pressure achieved ${accuracy}%. Decibel crest insufficient for interval scene.`;
      } else if (tier === 'average') {
        quote = '“Volume undu, pakshe punchline-nu munpu aa 2 second pause undo? Athu aanu cinema!”';
        translation = '“You have volume, but where is that 2-second dramatic pause before the punchline? That is cinema!”';
        specificObservation = `Climax tremor logged at ${drama}%. Dramatic timing scored ${timing}%.`;
      } else if (tier === 'good') {
        quote = '“Courtroom pin-drop silence aayi! Microphone is trembling with sheer dramatic justice!”';
        translation = '“The courtroom has fallen into pin-drop silence! The microphone is trembling with dramatic justice!”';
        specificObservation = `Acoustic diaphragm modulation scored ${overall}%. Surround sound 7.1 engaged.`;
      } else {
        quote = '“HISTORIC INTERVAL PUNCHLINE! The judge has torn up the verdict and joined your fan club!”';
        translation = '“HISTORIC INTERVAL PUNCHLINE! The judge has torn up the verdict and joined your fan club!”';
        specificObservation = `Peak decibel resonance achieved. Mass Index reached ${mass}%.`;
      }
    }

    return {
      tier,
      emotionalState,
      quote,
      translation,
      specificObservation,
      mentorName: mentor.name,
      mentorTitle: mentor.title,
      mentorMalayalam: mentor.malayalamName
    };
  }
}
