export interface TranscriptionJobOutput {
    status: string;
    jobName: string;
    accountId: string;
    results: TranscriptionJobResult;
}

interface TranscriptionJobResult {
    transcripts: Transcripts[]
    items: Item[];
}

interface Transcripts {
    transcript: string;
}

interface Item {
    type: string;
    start_time: string;
    end_time: string;
    alternatives: Alternative[];
}

interface Alternative {
    confidence: string;
    content: string;
}
