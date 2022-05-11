export class ReferenceV1
{
    public constructor(id: string, type: string, name?: string) {
        this.id = id;
        this.type = type;
        this.name = name;
    }

    public id: string;
    public type: string;
    public name: string;
}