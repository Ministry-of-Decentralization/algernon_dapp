declare module 'FileStorage' {
  export interface FileStorage {
    new (web3Provider: string | object, enableLogs?: boolean): FileStorage;

    uploadFile(
      publicKey: string,
      fileName: string, 
      bytes: string,
      privateKey: string
      ): Promise<any>
    
    downloadToBuffer(
      link: string
    ): Promise<any>

    listDirectory(
      address: string
    ): Promise<any>
    
  }
}
