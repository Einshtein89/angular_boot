package com.nixsolutions.angular_boot.controllers;

import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.WebMvcProperties;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.support.RequestContextUtils;

@RestController
@RequestMapping("/")
public class LanguageController
{
  
  @Autowired
  private LocaleResolver localeResolver;
  
  @GetMapping
  public ResponseEntity<?> setLocale(HttpServletRequest req, HttpServletResponse res, @RequestParam String lang) {
//    LocaleContextHolder.setLocale(new Locale(lang));
//    RequestContextUtils.getLocaleResolver(req).resolveLocale(req);
//
//    localeResolver.setLocale(req, res, new Locale(lang));
    return new ResponseEntity<>(HttpStatus.OK);
  }
}
