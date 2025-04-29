import { Decoder, Stream } from '@garmin/fitsdk';
import {FitMessages, FitParseResult} from "../types/fitfile";

/**
 * Parse raw .fit file bytes into structured messages
 * @param bytes ArrayBuffer or Uint8Array from file input
 */
export const parseFitFile  = (bytes: ArrayBuffer | Uint8Array): FitParseResult => {
  const stream = Stream.fromByteArray(new Uint8Array(bytes));
  // console.log("isFIT (static method): " + Decoder.isFIT(stream));

  const decoder = new Decoder(stream);
  // console.log("isFIT (instance method): " + decoder.isFIT());
  // console.log("checkIntegrity: " + decoder.checkIntegrity());

  // Catch invalid or corrupted FIT files
  if (!decoder.isFIT() || !decoder.checkIntegrity()) {
    return {
      messages: {
        sessionMesgs: [],
        timeInZoneMesgs: [],
        splitMesgs: [],
        splitSummaryMesgs: [],
        userProfileMesgs: [],
        sportMesgs: [],
        lapMesgs: [],
        recordMesgs: [],
        gpsMetadataMesgs: []
      }, // empty structured message
      errors: ['Invalid or corrupted FIT file'],
    };
  }

  const { messages, errors } = decoder.read();

  console.log('errors', errors);
  console.log('messages', messages);

  const structuredMessages: FitMessages = {
    sessionMesgs: messages.sessionMesgs || [],
    timeInZoneMesgs: messages.timeInZoneMesgs || [],
    splitMesgs: messages.splitMesgs || [],
    splitSummaryMesgs: messages.splitSummaryMesgs || [],
    userProfileMesgs: messages.userProfileMesgs || [],
    sportMesgs: messages.sportMesgs || [],
    lapMesgs: messages.lapMesgs || [],
    recordMesgs: messages.recordMesgs || [],
    gpsMetadataMesgs: messages.gpsMetadataMesgs || []
  };

  return { messages: structuredMessages, errors };
};
