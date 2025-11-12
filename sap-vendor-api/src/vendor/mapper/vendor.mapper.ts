export class VendorMapper {
    static toOutputDto(input: any): any {
        return {
            id: input.id,
            name: input.name,
            items: input.items.map(item => ({
                id: item.id,
                description: item.description,
                price: item.price,
            })),
        };
    }

    static toInputDto(output: any): any {
        return {
            id: output.id,
            name: output.name,
            items: output.items.map(item => ({
                id: item.id,
                description: item.description,
                price: item.price,
            })),
        };
    }
}