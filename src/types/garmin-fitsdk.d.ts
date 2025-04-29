declare module '@garmin/fitsdk' {
  // Decoder class
  export class Decoder {
    constructor(stream: Stream);

    isFIT(): boolean;
    checkIntegrity(): boolean;
    read(): {
      messages: Record<string, any>;
      errors: string[];
    };

    static isFIT(stream: Stream): boolean;
  }

  // Stream class
  export class Stream {
    static fromByteArray(bytes: Uint8Array): Stream;
  }

  // Profile and Utils exist too, but let's define later if needed
  export class Profile {}
  export class Utils {}
}