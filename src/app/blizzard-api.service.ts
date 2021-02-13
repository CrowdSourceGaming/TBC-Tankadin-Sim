import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


const blizzardApiUrl = 'https://us.api.blizzard.com/'

@Injectable({
  providedIn: 'root'
})
export class BlizzardApiService {

  blizzardAccessToken: string | null = null;

  constructor(private httpClient: HttpClient) {
    if (!this.blizzardAccessToken) {
      this.login().subscribe(token => {
        console.log('token', token)
        this.blizzardAccessToken = 'Bearer ' + token.access_token;
      })
    }
  }


  // async init() {

  //   this.wowClient = await wow.createInstance({
  //     key: environment.blizzardAPICreds.clientId,
  //     secret: environment.blizzardAPICreds.clientSecret,
  //     origin: 'us', // optional
  //     locale: 'en_US' // optional
  //   })
  // }

  async getItemMediaURL(itemId: number): Promise<Observable<string>> {
    await this.waitForConnection();
    return this.httpClient.get<ItemMediaResponse>(blizzardApiUrl + `data/wow/media/item/${itemId}`, { headers: this.assembleHeaders(), params: this.assembleParams() }).pipe(
      map(r => {
        const foundRecord = r.assets.find(asset => asset.key === 'icon')?.value
        return foundRecord || '';
      })
    )
  }


  private login(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${environment.blizzardAPICreds.clientId}:${environment.blizzardAPICreds.clientSecret}`)
    })

    return this.httpClient.get('https://us.battle.net/oauth/token?grant_type=client_credentials', { headers })
  }


  private assembleHeaders() {
    return new HttpHeaders({ 'Authorization': this.blizzardAccessToken! });
  }

  private assembleParams() {
    return new HttpParams({ fromObject: { namespace: 'static-us' } });
  }

  private async waitForConnection() {
    while (!this.blizzardAccessToken) {
      await this.sleep(100);
    }
  }

  private sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}


export interface ItemMediaResponse {
  _links: {
    self: {
      href: string
    }
  },
  assets: ItemMediaAsset[],
  id: number
}

export interface ItemMediaAsset {
  key: string,
  value: string,
  file_data_id: number
}
