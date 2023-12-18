import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OemService } from './oem.service';
import { KeypairSigner } from '@metaplex-foundation/umi';
import { CreateWalletsDto } from './dto/create-wallets.dto';
import { LoginOemDto } from './dto/login-oem.dto';

@Controller('oem')
export class OemController {
  constructor(private readonly oemService: OemService) { }

  /*------------------ Get the wallet balance------------------------*/

  @Get('wallet-balance/:pubkey')
  async getWalletBalance(@Param('pubkey') pubkey: string): Promise<Number> {
    return this.oemService.getWalletBalance(pubkey);
  }

  /*---------- Used to create a wallet and generate a new instance of OEM with the given signer-------- */
  @Post('create-oem')
  async createOemWallet(): Promise<JSON> {
    // returns a promise
    return this.oemService.createOemWallet(); // returns a promise containing {mnemonic, keypair}
  }

  /*------------Create and fund the consumable wallets-----------------------------------------*/

  @Post('create-consumable-wallets')
  createConsumableWallet(@Body() createWalletsDto: CreateWalletsDto) {
    return this.oemService.createConsumableWallet(
      createWalletsDto.numberOfWallets,
      createWalletsDto.signer,
      createWalletsDto.tokensPerWallet,
    );
  }

  /**--------------------------------------------------------------------------------------------- */

  /* ============================Login using mnemoics and store signer on the local storage=============================== */

  @Post('login-oem')
  async loginOem(@Body() loginOemDto: LoginOemDto): Promise<KeypairSigner> {
    return this.oemService.loginOem(loginOemDto.mnemonic);
  }
}
