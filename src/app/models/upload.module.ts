export class Upload {
    $key: string;
    file: File;
    url: string;
    name:string;
    progress: number;
    createOn: Date = new Date();

    constructor(file: File){
        this.file = file;
    }
}