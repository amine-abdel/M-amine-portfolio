import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  language: "es" | "en" | "fr" = "en";

  constructor(
    public translateService: TranslateService,
    private location: Location,
  ) {
    // Initialize with English as default
  }

  initLanguage(){
    this.translateService.addLangs(["en", "es", "fr"])
    
    // Set English as default language
    let language: "es" | "en" | "fr" = "en";
    
    // Check if user has a saved language preference
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && ["en", "es", "fr"].includes(savedLanguage)) {
      language = savedLanguage as "es" | "en" | "fr";
    } else {
      // Fallback to browser language if no saved preference
      const browserLanguage = navigator.language || (navigator as any).userLanguage;
      if (browserLanguage.split("-").includes("es")) {
        language = "es";
      } else if (browserLanguage.split("-").includes("fr")) {
        language = "fr";
      }
      // English remains default for all other cases
    }
    
    this.translateService.setDefaultLang(language)

    // Change the URL without navigate:
    this.location.go(language)

    this.language = language;
  }

  changeLanguage(language: "es" | "en" | "fr"){
    this.translateService.setDefaultLang(language)
    this.location.go(language)
    this.language=language
    
    // Save language preference to localStorage
    localStorage.setItem('selectedLanguage', language);
  }
}
