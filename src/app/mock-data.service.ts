import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  constructor() {}

  generateMockData(numberOfEntries: number): any[] {
    const mockData: any[] = [];

    const generateRandomDate = (dayOffset: number): Date => {
      const baseDate = new Date('2023-01-01');
      const newDate = new Date(baseDate);
      newDate.setDate(baseDate.getDate() + dayOffset);
      return newDate;
    };

    const generateRandomName = (): string => {
      const names = [
        'Rosinda Lopes',
        'Vanda Fernandes',
        'Mario Cunha',
        'Joao Silva',
        'Maria Santos',
        'Ana Rodrigues',
        'Rui Santos',
      ];
      return names[Math.floor(Math.random() * names.length)];
    };

    const generateRandomCategory = (): string => {
      const names = ['Questionário', 'Documentos', 'Informação'];
      return names[Math.floor(Math.random() * names.length)];
    };

    function generateRandomDate2023(): string {
      const start = new Date('2023-01-01');
      const end = new Date('2023-12-31');
      const randomTime =
        start.getTime() + Math.random() * (end.getTime() - start.getTime());

      const randomDate = new Date(randomTime);

      // Format date manually as D/MM/YY
      const day = randomDate.getDate().toString().padStart(2, '0');
      const month = (randomDate.getMonth() + 1).toString().padStart(2, '0');
      const year = randomDate.getFullYear().toString().slice(-2);

      return `${day}/${month}/${year}`;
    }

    for (let i = 1; i <= numberOfEntries; i++) {
      mockData.push({
        numeroCliente: Math.floor(Math.random() * 900) + 100,
        dataEmail: generateRandomDate2023(),
        dataInicial: generateRandomDate(i),
        dataFinal: generateRandomDate(i + 15),
        nProposta: Math.floor(Math.random() * 9000000000) + 1000000000,
        categoria: generateRandomCategory(),
        gestorRemetente: generateRandomName(),
        gestorDestinatario: generateRandomName(),
        simOuNao: `option${(i % 2) + 1}`,
      });
    }

    return mockData;
  }

  getMockData(numberOfEntries: number): any[] {
    return this.generateMockData(numberOfEntries);
  }
}
