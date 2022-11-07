    export class Modulemake {
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
        data:any;
    }

    export class SolarMadeModel {
        id: number;
        name: string;
        modulemodel?: any;
        created_at: Date;
        updated_at: Date;
        description: string;
        nameplatepmax: string;
        ptc: string;
        numberofcells: number;
        isc: number;
        voc: number;
        ipmax: number;
        vpmax: number;
        tempcoefofvoc: number;
        fuserating: number;
        length: number;
        width: number;
        area: number;
        weight: number;
        modulemake: Modulemake;
        data:any;
        constructor(){
            this.modulemake = new Modulemake();
        }
    }


