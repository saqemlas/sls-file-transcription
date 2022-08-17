export interface EnvironmentVars {
    env: {
        LOG_LEVEL?: string;
        IS_LOCAL?: string;

        ENVIRONMENT?: string;
        REGION?: string;

        BUCKET_NAME?: string;
    
        // Unknown properties are covered by this index signature.
        [key: string]: string;
    }
}
