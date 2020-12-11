# General Security Guidelines

## Computer Security

1. Password protect your computer. Makes it harder for the bad guys to instantly get access to all our stuffs.
2. Encrypt your hard drive. For bad guys with too much time on their hands, should prevent them from mounting your hard drive on another device.
3. Reset your firmware password: Restart your Mac while holding cmd+r. This should boot you into the recovery hard drive. Once there, you should be able to find a utility called "Firmware Password Utility," which will allow you to enable a firmware password.
4. Enable any "remote erase" (ie Find my Mac) feature your computer might have. You'll sleep better knowing the bad guys only got your computer, not the volumes of personal and client data on it.
5. Install antivirus software that updates virus definitions at least weekly.

## Password and Credential Management

All Tandem team members shall use the designated encrypted password storage utility (currently LastPass) according to the following policies:

1.  To the greatest extent possible, team members should only have access to client credentials for the projects they are currently working on.
2.  Tandem team members should be removed from access to project materials in a reasonable time after the cease working on a project.
3.  Never store credentials in plain text or share them via plain text. Always utilize our password management system. If you share a resource in a public space unintentionally, immediately notify your project manager of the security breach.
4. Use the LastPass password generator and make sure that all passwords conform to NIST SP800-63b standards.
4. Where applications support it, Tandem staff are expected to use two-factor authentication.

## Managing Personal/Confidential Information

1.  Never download a client database that links sensitive personal information (ex: SSNs, health information, financial information) with personally identifiable information (ex: names, addresses, DoBs). Sanitization functions or dummy data must be used locally (and should be used on all test environments) if a site handles any of these types of data.
    1. In the case that the client is unable to provide a sanitized data source or when such a data source would be impossible to create, obtain permission from the client to handle this data on your computer. Discuss with your project manager if you have questions.
2.  Consult the project manager before handling ANY sensitive personal information and question its necessity in the project.
3. Use a secure mechanism to transfer sensitive files. Google Drive data is transmitted over SSL and is protected by a BAA (in the case of health data) that we have with them. Create a shared folder and send it as a link. Be aware of who else has access to the space. Once you have retrieved the file, delete it from Drive unless it is needed.

## For Project Managers

### Managing Contractors

When managing contractors, be very aware of the material that you give them access to.

The following clause is included in all Tandem contractor agreements:

> Confidentiality and Confidential Materials: Consultant must keep all
> information, communications, work product, and other materials or
> knowledge that Tandem considers or could consider confidential or
> proprietary strictly confidential and actively safeguard said
> confidential information. Consultant acknowledges that it will be
> necessary for Tandem to disclose certain confidential and proprietary
> information to Consultant in order for Consultant to perform its
> duties under this Agreement. Consultant acknowledges that any
> disclosure to any third party or any misuse of this proprietary or
> confidential information would irreparably harm Tandem. Accordingly,
> Consultant will not use or disclose Tandem' confidential information
> to others without Tandem's prior written consent, before or after this
> Agreement is terminated.
>
> Confidential Information includes, but is not limited to:
>
> The written, printed, graphic, or electronically recorded materials
> furnished by Tandem for use by Contractor; Tandem's business or
> marketing plans or strategies, customer lists, operating procedures,
> trade secrets, design formulas, know-how and processes, computer
> programs and inventories, discoveries, and improvements of any kind;
> Any written or tangible information stamped "confidential,"
> "proprietary," or with a similar legend, and; Any written or tangible
> information not marked with a confidentiality legend, or information
> disclosed orally to Consultant, that is treated as confidential when
> disclosed and later summarized sufficiently for identification
> purposes in a written memorandum marked "confidential" and delivered
> to Consultant within 30 days after the disclosure.
>
> Consultant shall not be restricted in the use of any material that is
> publicly available, already in Contractor's possession prior to
> commencement of Consultant's provision of services to Tandem, known to
> Consultant without restriction, or rightfully obtained by Consultant
> from sources other than Tandem.
>
> Consultant's obligations regarding proprietary or confidential
> information extend to information belonging to customers and suppliers
> of Tandem about whom Consultant may have gained knowledge as a result
> of Consultant 's services to Tandem.
>
> Consultant will not disclose to Tandem information or material that is
> a trade secret of any third party.
>
> The provisions of this clause shall survive any termination of this
> Agreement.


Tandem project managers should endeavor to explicitly label in writing any client material that should be considered "Confidential Information" so as to be covered by the above agreement.

Tandem project managers should contact management immediately if any client requests additional confidentiality assurances/contracts.

Tandem project managers should double-check that contractors are following security guidelines detailed for all Tandem staff; if they are unwilling to, please notify management.

### Managing Vendors

Most vendors Tandem utilizes have the potential to be processing confidential information. When onboarding a new vendor service...

1. Review the privacy/confidentiality policies.
2. Obtain a GDPR Data Processing Agreement
3. Obtain a Business Associate Agreement (if handling PHI)
4. Present all your findings and contracts to management

All relevant docs should be stored in the Legal folder on Google Drive.
